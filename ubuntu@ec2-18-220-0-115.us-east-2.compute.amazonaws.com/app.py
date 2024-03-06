from flask import jsonify, request
from models import app, db, City, Organization, Scholarship
from schema import city_schema, organization_schema, scholarship_schema

@app.route('/')
def home():
    return "<h1>BrighterBeginnings API</h1>"

# return page of all cities
@app.route('/cities',  methods=['GET'])
def get_cities():
    query = db.session.query(City)
    page = request.args.get('page', type=int, default=1)
    per_page = request.args.get('per_page', type=int, default=10)

    result = query.paginate(page=page, per_page=per_page, error_out=False)
    schema = city_schema.dump(result, many=True)
    total = query.count()
    print(page)
    print(per_page)
    return jsonify({"cities":schema, "meta": {"count": total}})

# return instance of city
@app.route('/cities/<int:city_id>', methods=['GET'])
def get_single_city(city_id):
    try:
        city = db.session.query(City).filter_by(id=city_id).one()
        city_data = city_schema.dump(city)
        return jsonify({"city": city_data})
    except IndexError:
        return jsonify({"error": "City not found"}, 404)
    
# return page of all organizations
@app.route('/organizations', methods=['GET'])
def get_organizations():
    query = db.session.query(Organization)
    page = request.args.get('page', type=int, default=1)
    per_page = request.args.get('per_page', type=int, default=9)
    result = query.paginate(page=page, per_page=per_page, error_out=False)
    schema = organization_schema.dump(result, many=True)
    total = query.count()
    return jsonify({"organizations":schema, "meta": {"count": total}})

# return instance of organization
@app.route('/organizations/<int:organization_id>', methods=['GET'])
def get_single_organization(organization_id):
    try:
        organization = db.session.query(Organization).filter_by(id=organization_id).one()
        organization_data = organization_schema.dump(organization)
        return jsonify({"organization": organization_data})
    except IndexError:
        return jsonify({"error": "Organization not found"}, 404)
    
# return page of all scholarships
@app.route('/scholarships', methods=['GET'])
def get_scholarships():
    query = db.session.query(Scholarship)
    page = request.args.get('page', type=int, default=1)
    per_page = request.args.get('per_page', type=int, default=9)
    result = query.paginate(page=page, per_page=per_page, error_out=False)
    schema = scholarship_schema.dump(result, many=True)
    total = query.count()
    return jsonify({"scholarships":schema, "meta": {"count": total}})

# return instance of scholarship
@app.route('/scholarships/<int:_id>', methods=['GET'])
def get_single_scholarship(scholarship_id):
    try:
        scholarship = db.session.query(Scholarship).filter_by(id=scholarship_id).one()
        organization_data = organization_schema.dump(scholarship)
        return jsonify({"scholarship": organization_data})
    except IndexError:
        return jsonify({"error": "Scholarship not found"}, 404)

if __name__ == '__main__':
    app.run(port=5000, debug=True)

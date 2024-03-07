from flask import jsonify, request
from models import app, db, City, Organization, Scholarship
from schema import city_schema, organization_schema, scholarship_schema

@app.route('/')
def home():
    return ("<h1>BrighterBeginnings API</h1>" + 
    "<p>Welcome to the BrighterBeginnings API! Our website serves as an information hub for facilitating " +
    "access to organizations and scholarships for underserved students across different cities.<br><br/>" + 
    "Our API has endpoints to get all instances of cities, organizations, and scholarships within our " +
    "database, as well as specific instances of these models. To make a get all instances request, add " +
    "<q>/cities</q>, <q>/organizations</q>, or <q>/scholarships</q> to the path accordingly. " +
    "Additionally, the specific page number and number of results to display per page can be specificed " +
    "as query parameters by adding <q>?page={int}&per_page={int}</q> to the aforementioned endpoints. To make a " +
    "get single instance request for any of the models, simply add /id to the endpoints, which is the unique " +
    "identifier of the specific instance being looked for.</p>" +
    "<p>For example, to get all instances of cities, the endpoint would be /cities such that the URL looks like the following: " + 
    "<A href=https://api.brighterbeginnings.me/cities>https://api.brighterbeginnings.me/cities</A>" +
    "<p>To get a specific page of cities with a given amount of results, e.g. second page with six results, the endpoint " + 
    "would be /cities?page=2&per_page=6 such that the URL looks like the following: " + 
    "<A href=https://api.brighterbeginnings.me/cities?page=2&per_page=6>https://api.brighterbeginnings.me/cities?page=2&per_page=6</A>"
    "<p>In order to get a specific instance of a city, e.g. the first city, the endpoint would be /cities/1 such that the URL looks like the following: " + 
    "<A href=https://api.brighterbeginnings.me/cities/1>https://api.brighterbeginnings.me/cities/1</A>")

# return page of all scholarships
@app.route('/scholarships', methods=['GET'])
def get_scholarships():
    query = db.session.query(Scholarship)
    total = query.count()
    page = request.args.get('page', type=int, default=1)
    per_page = request.args.get('per_page', type=int, default=total)
    result = query.paginate(page=page, per_page=per_page, error_out=False)
    schema = scholarship_schema.dump(result, many=True)
    return jsonify({"Scholarships":schema, "Total scholarships": total})

# return instance of scholarship
@app.route('/scholarships/<int:scholarship_id>', methods=['GET'])
def get_single_scholarship(scholarship_id):
    try:
        scholarship = db.session.query(Scholarship).filter_by(id=scholarship_id).one()
        scholarship_data = scholarship_schema.dump(scholarship)
        return jsonify({"Scholarship": scholarship_data})
    except IndexError:
        return jsonify({"error": "Scholarship not found"}, 404)
    
# return page of all organizations
@app.route('/organizations', methods=['GET'])
def get_organizations():
    query = db.session.query(Organization)
    total = query.count()
    page = request.args.get('page', type=int, default=1)
    per_page = request.args.get('per_page', type=int, default=total)
    result = query.paginate(page=page, per_page=per_page, error_out=False)
    schema = organization_schema.dump(result, many=True)
    return jsonify({"Organizations":schema, "Total organizations": total})

# return instance of organization
@app.route('/organizations/<int:organization_id>', methods=['GET'])
def get_single_organization(organization_id):
    try:
        organization = db.session.query(Organization).filter_by(id=organization_id).one()
        organization_data = organization_schema.dump(organization)
        return jsonify({"Organization": organization_data})
    except IndexError:
        return jsonify({"error": "Organization not found"}, 404)
    
# return page of all cities
@app.route('/cities',  methods=['GET'])
def get_cities():
    query = db.session.query(City)
    total = query.count()
    page = request.args.get('page', type=int, default=1)
    per_page = request.args.get('per_page', type=int, default=total)
    result = query.paginate(page=page, per_page=per_page, error_out=False)
    schema = city_schema.dump(result, many=True)
    return jsonify({"Cities":schema, "Total cities": total})

# return instance of city
@app.route('/cities/<int:city_id>', methods=['GET'])
def get_single_city(city_id):
    try:
        city = db.session.query(City).filter_by(id=city_id).one()
        city_data = city_schema.dump(city)
        return jsonify({"City": city_data})
    except IndexError:
        return jsonify({"error": "City not found"}, 404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
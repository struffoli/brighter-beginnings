from flask import jsonify, request
from models import app, db, City, Organization, Scholarship
from schema import CitySchema, OrganizationSchema, ScholarshipSchema

@app.route('/')
def home():
    return ("<h1>BrighterBeginnings API</h1>" + 
    "<p>Welcome to the BrighterBeginnings API! Our website serves as an information hub for facilitating " +
    "access to organizations and scholarships for underserved students across different cities.<br><br/>" + 
    "Our API has endpoints to get all instances of cities, organizations, and scholarships within our " +
    "database, as well as specific instances of these models. To make a get all instances request, add " +
    "<q>/scholarships</q>, <q>/organizations</q>, or <q>/cities</q> to the path accordingly. " +
    "Additionally, the specific page number and number of results to display per page can be specificed " +
    "as query parameters by adding <q>?page={int}&per_page={int}</q> to the aforementioned endpoints. To make a " +
    "get single instance request for any of the models, simply add /id to the endpoints, which is the unique " +
    "identifier of the specific instance being looked for.</p>" +
    "<p>For example, to get all instances of scholarships, the endpoint would be /scholarships such that the URL looks like the following: " + 
    "<A href=https://api.brighterbeginnings.me/scholarships>https://api.brighterbeginnings.me/scholarships</A>" +
    "<p>To get a specific page of scholarships with a given amount of results, e.g. second page with six results, the endpoint " + 
    "would be /scholarships?page=2&per_page=6 such that the URL looks like the following: " + 
    "<A href=https://api.brighterbeginnings.me/scholarships?page=2&per_page=6>https://api.brighterbeginnings.me/scholarships?page=2&per_page=6</A>"
    "<p>In order to get a specific instance of a scholarship, e.g. the first scholarship, the endpoint would be /scholarships/1 such that the URL looks like the following: " + 
    "<A href=https://api.brighterbeginnings.me/scholarships/1>https://api.brighterbeginnings.me/scholarships/1</A>")

# return page of all scholarships
@app.route('/scholarships', methods=['GET'])
def get_scholarships():
    query = db.session.query(Scholarship)
    total = query.count()
    page = request.args.get('page', type=int, default=1)
    per_page = request.args.get('per_page', type=int, default=total)
    sort = request.args.get('sort', default=None)
    filter = request.args.get('filter', default=None)

    # sorting
    if sort is not None:
        if sort == 'name':
            query = query.order_by(Scholarship.name)
        elif sort == 'awarded_by':
            query = query.order_by(Scholarship.awarded_by)
        elif sort == 'award_amount':
            query = query.order_by(Scholarship.award_amount)

    # filtering 
    if filter is not None:
        if filter == 'merit_based':
            query = query.filter(Scholarship.merit_based == True)
        elif filter == 'need_based':
            query = query.filter(Scholarship.need_based == True)
        elif filter == 'essay_based':
            query = query.filter(Scholarship.essay_based == True)
        elif filter == 'nationwide':
            query = query.filter(Scholarship.nationwide == True)
        total = query.count()

    result = query.paginate(page=page, per_page=per_page, error_out=False)
    
    # searh scholarships
    search = request.args.get("search")
    if search != None:
        query = query.filter(Scholarship.name.ilike(f"%{search}%") | Scholarship.awarded_by.ilike(f"%{search}%") | Scholarship.award_amount.ilike(f"%{search}%"))
        total = query.count()
        result = query.paginate(page=page, per_page=per_page, error_out=False)
    
    schema = ScholarshipSchema().dump(result, many=True)
    return jsonify({"Scholarships":schema, "Total scholarships": total})

# return instance of scholarship
@app.route('/scholarships/<int:scholarship_id>', methods=['GET'])
def get_single_scholarship(scholarship_id):
    try:
        scholarship = db.session.query(Scholarship).filter_by(id=scholarship_id).one()
        scholarship_data = ScholarshipSchema().dump(scholarship)
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
    sort = request.args.get('sort', default=None)
    filter = request.args.get('filter', default=None)

    # sorting
    if sort is not None:
        if sort == 'id':
            query = query.order_by(Organization.id)
        elif sort == 'name':
            query = query.order_by(Organization.name)
        elif sort == 'organization_type':
            query = query.order_by(Organization.organization_type)
        elif sort == 'address':
            query = query.order_by(Organization.address)

    # filtering 
    if filter is not None:
        if filter == 'email':
            query = query.filter(Organization.email != 'N/A')
        if filter == 'phone':
            query = query.filter(Organization.phone != 'N/A')
        total = query.count()

    result = query.paginate(page=page, per_page=per_page, error_out=False)
    
    # searh organizations
    search = request.args.get("search")
    if search != None:
        query = query.filter(Organization.name.ilike(f"%{search}%") | Organization.organization_type.ilike(f"%{search}%"))
        total = query.count()
        result = query.paginate(page=page, per_page=per_page, error_out=False)
    
    schema = OrganizationSchema().dump(result, many=True)
    return jsonify({"Organizations":schema, "Total organizations": total})

# return instance of organization
@app.route('/organizations/<int:organization_id>', methods=['GET'])
def get_single_organization(organization_id):
    try:
        organization = db.session.query(Organization).filter_by(id=organization_id).one()
        organization_data = OrganizationSchema().dump(organization)
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
    sort = request.args.get('sort', default=None)

    # sorting
    if sort is not None:
        if sort == 'name':
            query = query.order_by(City.name)
        elif sort == 'population':
            query = query.order_by(City.population)
        elif sort == 'state':
            query = query.order_by(City.state)
        elif sort == 'median_income':
            query = query.order_by(City.median_income)
        elif sort == 'unemployment_rate':
            query = query.order_by(City.unemployment_rate)
        elif sort == 'college_educated_rate':
            query = query.order_by(City.college_educated_rate)
        elif sort == 'poverty_rate':
            query = query.order_by(City.poverty_rate)

    result = query.paginate(page=page, per_page=per_page, error_out=False)
    # searh cities
    search = request.args.get("search")
    if search != None:
        query = query.filter(City.name.ilike(f"%{search}%") | City.state.ilike(f"%{search}%") | City.population.ilike(f"%{search}%"))
        total = query.count()
        result = query.paginate(page=page, per_page=per_page, error_out=False)
    schema = CitySchema().dump(result, many=True)
    return jsonify({"Cities":schema, "Total cities": total})

# return instance of city
@app.route('/cities/<int:city_id>', methods=['GET'])
def get_single_city(city_id):
    try:
        city = db.session.query(City).filter_by(id=city_id).one()
        city_data = CitySchema().dump(city)
        return jsonify({"City": city_data})
    except IndexError:
        return jsonify({"error": "City not found"}, 404)

 
# searches through all the models    
@app.route('/search', methods=['GET'])
def search():
    search_term = request.args.get('query', '')
    search_term = f"%{search_term}%"

    city_results = City.query.filter(City.name.ilike(search_term)).all()
    organization_results = Organization.query.filter(Organization.name.ilike(search_term)).all()
    scholarship_results = Scholarship.query.filter(Scholarship.name.ilike(search_term)).all()
    
    # serialize the data
    city_schema = CitySchema(many=True)
    organization_schema = OrganizationSchema(many=True)
    scholarship_schema = ScholarshipSchema(many=True)

    return jsonify({
        'cities': city_schema.dump(city_results),
        'organizations': organization_schema.dump(organization_results),
        'scholarships': scholarship_schema.dump(scholarship_results)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
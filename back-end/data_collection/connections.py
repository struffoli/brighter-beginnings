import json
import ast
import googlemaps

def get_distance(origin, destination, api_key):
    # Initialize the Google Maps client with your API key
    gmaps = googlemaps.Client(key=api_key)
    
    # Request distance information from the Distance Matrix API
    # print(origin + " ///// " + destination)
    distance_result = gmaps.distance_matrix(origins=origin, destinations=destination, mode='driving')

    if (distance_result['rows'][0]['elements'][0]['status'] == 'ZERO_RESULTS'): # possibly not accessible, like Hawaii
        return float('inf')
    
    # Extract distance from the result
    distance = distance_result['rows'][0]['elements'][0]['distance']['value']
    
    return distance

# Form groups of 3 Cities, 2 orgs, and 1 scholarship based on location

# Read JSON data from file
with open('connections_before.txt') as file:
    data = file.readline()
    cities = json.loads(data)["Cities"]

    file.readline()
    orgs = json.loads(file.readline())["Organizations"]

    file.readline()
    scholarships = json.loads(file.readline())["Scholarships"]

    # # Perform stable marriage algorithm to create pairs of orgs based on their distances
    # pairs = []
    # unmatched_orgs = orgs.copy()

    # while unmatched_orgs:
    #     org = unmatched_orgs.pop(0)
    #     best_match = None
    #     best_distance = float('inf')

    #     for other_org in unmatched_orgs:
    #         distance = get_distance(org["address"], other_org["address"], "AIzaSyD7niW97aGw6jUpDAucOAEBCXxnM9zmx-E")
    #         # print(distance)
    #         if distance < best_distance:
    #             best_match = other_org
    #             best_distance = distance

    #     if best_match:
    #         pairs.append((org, best_match))
    #         unmatched_orgs.remove(best_match)

    # output pairs to org_pairs.txt

    # with open('org_pairs.txt') as file:
    #     pairs = []
    #     for i in range(50):
    #         tuple_str = file.readline()
    #         pair = ast.literal_eval(tuple_str)
    #         pairs.append(pair)
    #     # Now match org pairs to 3 nearest cities

    #     groups = []
    #     unmatched_cities = cities.copy()
        
    #     while unmatched_cities:
    #         # Find 3 cities closest to an org pair (just use the first org in the pair)
    #         org_pair = pairs.pop(0)
    #         distances = []

    #         for city in unmatched_cities:
    #             distance = get_distance(org_pair[0]["address"], city["name"] + ", " + city["state"], "AIzaSyD7niW97aGw6jUpDAucOAEBCXxnM9zmx-E")
    #             distances.append((city, distance))
            
    #         distances.sort(key=lambda x: x[1])
    #         group = (scholarships[len(groups)], org_pair[0], org_pair[1], distances[0][0], distances[1][0], distances[2][0])
    #         groups.append(group)
    #         unmatched_cities.remove(distances[0][0])
    #         unmatched_cities.remove(distances[1][0])
    #         unmatched_cities.remove(distances[2][0])
    #         print(group)

# finally push to db!!!!!!!!!!

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Configure app
app = Flask(__name__)
# Enables front-end to make requests to back-end on different domains
CORS(app)
# disable tracking for better performance
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Set URI to establish a connection with database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://admin:cc0518Kl$@brighterbeginnings.c3kg6s42amyv.us-east-2.rds.amazonaws.com:3306/brighterbeginnings"
# Create db linked to app
db = SQLAlchemy(app)

# Association table between scholarships and cities
scholarship_city_association = db.Table(
    'scholarship_city_association',
    db.Column('scholarship', db.ForeignKey('scholarship.id'), primary_key=True),
    db.Column('city', db.ForeignKey('city.id'), primary_key=True)
)  

class Scholarship(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    awarded_by = db.Column(db.String(255))
    award_amount = db.Column(db.Integer)
    merit_based = db.Column(db.Boolean)
    need_based = db.Column(db.Boolean)
    essay_based = db.Column(db.Boolean)
    nationwide = db.Column(db.Boolean)
    img_src = db.Column(db.String(255))
    link = db.Column(db.String(255))
    #Establishing relationships
    cities = db.relationship('City', secondary=scholarship_city_association, back_populates='scholarships')
    organizations = db.relationship('Organization', back_populates='scholarship')
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "awarded_by": self.awarded_by,
            "award_amount": self.award_amount,
            "merit_based": self.merit_based,
            "need_based": self.need_based,
            "essay_based": self.essay_based,
            "nationwide": self.nationwide,
            "img_src": self.img_src,
            "link": self.link
        }


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    organization_type = db.Column(db.String(255))
    img_src = db.Column(db.String(255))
    scholarship_id = db.Column(db.Integer, db.ForeignKey('scholarship.id'))
    address = db.Column(db.String(255))
    # Establishing relationship
    scholarship = db.relationship('Scholarship', back_populates='organizations')
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "organization_type": self.organization_type,
            "img_src": self.img_src,
            "scholarship_id": self.scholarship_id,
            "address": self.address
        }  


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    population = db.Column(db.Integer)
    state = db.Column(db.String(255))
    median_income = db.Column(db.String(255))
    unemployment_rate = db.Column(db.Float)
    college_educated_rate = db.Column(db.Float)
    poverty_rate = db.Column(db.Float)
    img_src = db.Column(db.String(255))
    scholarships = db.relationship('Scholarship', secondary=scholarship_city_association, back_populates='cities')
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "population": self.population,
            "state": self.state,
            "median_income": self.median_income,
            "unemployment_rate": self.unemployment_rate,
            "college_educated_rate": self.college_educated_rate,
            "poverty_rate": self.poverty_rate,
            "img_src": self.img_src
        }
    
# Used to add data
with app.app_context():
   
    # create tables
    # db.drop_all()
    # db.create_all()

    with open('connection_groups.txt', 'r', encoding='utf-8-sig') as file:
        pairs = []
        for i in range(50):
            tuple_str = file.readline()
            tuple_str = tuple_str.replace('\0', '')
            group = ast.literal_eval(tuple_str)
            # print(group[0]["name"] + "//" + group[1]["name"] + "//" + group[2]["name"] + "//" + group[3]["name"] + "//" + group[4]["name"] + "//" + group[5]["name"])
            # print(group[0])
            scholarship = Scholarship(
                id = group[0]['id'],
                name=group[0]['name'],
                awarded_by=group[0]['awarded_by'],
                award_amount=group[0]['award_amount'],
                merit_based=group[0]['merit_based'],
                need_based=group[0]['need_based'],
                essay_based=group[0]['essay_based'],
                nationwide=group[0]['nationwide'],
                img_src=group[0]['img_src'],
                link=group[0]['link']
            )

            organization1= Organization(
                id = group[1]['id'],
                name=group[1]['name'],
                email=group[1]['email'],
                phone=group[1]['phone'],
                organization_type=group[1]['organization_type'],
                img_src=group[1]['img_src'],
                address=group[1]['address'],
                scholarship=scholarship
            )

            organization2= Organization(
                id = group[2]['id'],
                name=group[2]['name'],
                email=group[2]['email'],
                phone=group[2]['phone'],
                organization_type=group[2]['organization_type'],
                img_src=group[2]['img_src'],
                address=group[2]['address'],
                scholarship=scholarship
            )

            city1 = City(
                id = group[3]['id'],
                name=group[3]['name'],
                population=group[3]['population'],
                state=group[3]['state'],
                median_income=group[3]['median_income'],
                unemployment_rate=group[3]['unemployment_rate'],
                college_educated_rate=group[3]['college_educated_rate'],
                poverty_rate=group[3]['poverty_rate'],
                img_src=group[3]['img_src']
            )

            city2 = City(
                id = group[4]['id'],
                name=group[4]['name'],
                population=group[4]['population'],
                state=group[4]['state'],
                median_income=group[4]['median_income'],
                unemployment_rate=group[4]['unemployment_rate'],
                college_educated_rate=group[4]['college_educated_rate'],
                poverty_rate=group[4]['poverty_rate'],
                img_src=group[4]['img_src']
            )
            city3 = City(
                id = group[5]['id'],
                name=group[5]['name'],
                population=group[5]['population'],
                state=group[5]['state'],
                median_income=group[5]['median_income'],
                unemployment_rate=group[5]['unemployment_rate'],
                college_educated_rate=group[5]['college_educated_rate'],
                poverty_rate=group[5]['poverty_rate'],
                img_src=group[5]['img_src']
            )

            # Linking scholarships to cities
            scholarship.cities.append(city1)
            scholarship.cities.append(city2)
            scholarship.cities.append(city3)

            # Committing instances to the database
            db.session.add_all([scholarship, organization1, organization2, city1, city2, city3])
            db.session.commit()
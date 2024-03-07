from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import ForeignKey, DECIMAL
from sqlalchemy.orm import relationship

# Configure app
app = Flask(__name__)
# Enables front-end to make requests to back-end on different domains
CORS(app)
# disable tracking for better performance
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Set URI to establish a connection with database
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://admin:cc0518Kl$@brighterbeginnings.c3kg6s42amyv.us-east-2.rds.amazonaws.com:3306/brighterbeginnings"
# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:letitgrow@localhost/idb"
# Create db linked to app
db = SQLAlchemy(app)

class Scholarship(db.Model):
    __tablename__ = 'scholarships'
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
    #Establishing relationship
    organizations = relationship('Organization', backref='scholarship_organization', lazy=True)
    cities = relationship('City', backref='scholarship_city', lazy=True)


class Organization(db.Model):
    __tablename__ = 'organizations'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    organization_type = db.Column(db.String(255))
    img_src = db.Column(db.String(255))
    scholarship_id = db.Column(db.Integer, ForeignKey('scholarships.id'))
    # Establishing relationship
    cities = relationship('City', backref='organization', lazy=True)


class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    population = db.Column(db.Integer)
    state = db.Column(db.String(255))
    median_income = db.Column(db.String(255))
    unemployment_rate = db.Column(db.DECIMAL(4,3))
    college_educated_rate = db.Column(db.DECIMAL(4,3))
    poverty_rate = db.Column(db.DECIMAL(4,3))
    img_src = db.Column(db.String(255))
    scholarship_id = db.Column(db.Integer, ForeignKey('scholarships.id'))
    organization_id = db.Column(db.Integer, ForeignKey('organizations.id'))

with app.app_context():
    
    # create tables
    db.create_all()

    # Dummy Data 
    # scholarship9 = Scholarship(name="Scholarship 9", donor="Donor 9", area="Business", age_group="College", amount="$2500", num_recipients=4, description="Description 9", link="http://example.com", img_src="img9.jpg")
    # scholarship10 = Scholarship(name="Scholarship 10", donor="Donor 10", area="Medicine", age_group="Graduate", amount="$4000", num_recipients=1, description="Description 10", link="http://example.com", img_src="img10.jpg")
    # # Add more scholarships...

    # # Creating instances for the Organization model
    # organization9 = Organization(name="Organization 9", address="666 Pine St", distance="10 miles", contact_info="org9@example.com", organization_type="For-profit", img_url="org_img9.jpg", location_img_url="location_img9.jpg")
    # organization10 = Organization(name="Organization 10", address="777 Birch St", distance="15 miles", contact_info="org10@example.com", organization_type="Non-profit", img_url="org_img10.jpg", location_img_url="location_img10.jpg")
    # # Add more organizations...

    # # Creating instances for the City model
    # city9 = City(name="City 9", population="200,000", num_schools=20, test_score="A", median_income="$70,000", percent_unemployment=8, percent_free_lunch=15, percent_educated=85, img_src="city_img9.jpg")
    # city10 = City(name="City 10", population="120,000", num_schools=12, test_score="B", median_income="$50,000", percent_unemployment=5, percent_free_lunch=22, percent_educated=78, img_src="city_img10.jpg")
    # # Add more cities...

    # # Commit the instances to the database
    # db.session.add_all([scholarship9, scholarship10, organization9, organization10, city9, city10])
    # db.session.commit()    
    






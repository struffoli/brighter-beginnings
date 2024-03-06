from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import ForeignKey
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

class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    population = db.Column(db.String(255))
    num_schools = db.Column(db.Integer)
    test_score = db.Column(db.String(255))
    median_income = db.Column(db.String(255))
    percent_unemployment = db.Column(db.Integer)
    percent_free_lunch = db.Column(db.Integer)
    percent_educated = db.Column(db.Integer)
    img_src = db.Column(db.String(255))

    # Establish relationships
    organizations = relationship('Organization', backref='city_organization', lazy=True)
    scholarships = relationship('Scholarship', backref='city_scholarship', lazy=True)


class Organization(db.Model):
    __tablename__ = 'organizations'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    city = db.Column(db.String(255))
    city_id = db.Column(db.Integer, ForeignKey('cities.id'))
    address = db.Column(db.String(255))
    distance = db.Column(db.String(255))
    contact_info = db.Column(db.String(255))
    organization_type = db.Column(db.String(255))
    img_url = db.Column(db.String(255))
    location_img_url = db.Column(db.String(255))

    # Establishing relationship
    scholarships = relationship('Scholarship', backref='organization', lazy=True)

class Scholarship(db.Model):
    __tablename__ = 'scholarships'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    city = db.Column(db.String(255))
    donor = db.Column(db.String(255))
    area = db.Column(db.String(255))
    age_group = db.Column(db.String(255))
    amount = db.Column(db.String(255))
    num_recipients = db.Column(db.Integer)
    description = db.Column(db.String(255))
    link = db.Column(db.String(255))
    img_src = db.Column(db.String(255))
    city_id = db.Column(db.Integer, ForeignKey('cities.id'))
    org_id = db.Column(db.Integer, ForeignKey('organizations.id'))


with app.app_context():
    
#     create tables
#     db.create_all()


    city_instance = City(name='City C', population='100000', num_schools=10, test_score='A', median_income='50000',
                        percent_unemployment=5, percent_free_lunch=20, percent_educated=90, img_src='city_image.jpg')

    organization_instance = Organization(name='Org C', city='Example City', city_id=1, address='123 Main St',
                                        distance='5 miles', contact_info='org@example.com', organization_type='Non-profit',
                                        img_url='org_logo.jpg', location_img_url='org_location.jpg')

    scholarship_instance = Scholarship(name='Scholarship B', city='Example City', donor='Example Donor',
                                    area='Science', age_group='High School', amount='5000', num_recipients=3,
                                    description='Description of the scholarship', link='scholarship_link.com',
                                    img_src='scholarship_image.jpg', city_id=1, org_id=1)

    # Add instances to the database session
    db.session.add(city_instance)
    db.session.add(organization_instance)
    db.session.add(scholarship_instance)

    # Commit the changes to persist the instances in the database
    db.session.commit()

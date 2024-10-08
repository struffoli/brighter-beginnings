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
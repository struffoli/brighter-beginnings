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
# app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:letitgrow@localhost/idb"
# Create db linked to app
db = SQLAlchemy(app)

# Association table
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


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    phone = db.Column(db.String(255))
    organization_type = db.Column(db.String(255))
    img_src = db.Column(db.String(255))
    scholarship_id = db.Column(db.Integer, db.ForeignKey('scholarship.id'))
    # Establishing relationship
    scholarship = db.relationship('Scholarship', back_populates='organizations')


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


# Used to add data
with app.app_context():
    
    # create tables
    # db.drop_all()
    db.create_all()

    scholarship = Scholarship(
        name='C. Burke Morris Scholarship',
        awarded_by='Morris Mountaineer',
        award_amount=1000,
        merit_based=False,
        need_based=False,
        essay_based=True,
        nationwide=False,
        img_src='https://static.bold.org/cburkemorrisscholarshipcover11c7d1fec8ced944e4a95a62bfb570dca7.webp',
        link='https://bold.org/scholarships/c-burke-morris-scholarship/'
    )
    # Example data for Organization
    organization1 = Organization(
        name='Texas Ace',
        email='N/A',
        phone='512-463-9734',
        organization_type='Government',
        img_src='https://upload.wikimedia.org/wikipedia/en/d/d7/Afterschool_Alliance_Logo.png',
        scholarship=scholarship  # Linking organization to scholarship
    )

    organization2 = Organization(
        name='Morris Mountaineer',
        email='N/A',
        phone='304-848-7472',
        organization_type='Corporate',
        img_src='https://static.wixstatic.com/media/1a1197_ac26f6ce05ef4436a307586655dcfe1c~mv2.png/v1/fill/w_500,h_330,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo.png',
        scholarship=scholarship  # Linking organization to scholarship2
    )

    # Example data for City
    city1 = City(
        name='New York',
        population=8335897,
        state='New York',
        median_income='$74,694',
        unemployment_rate=0.064,
        college_educated_rate=0.414,
        poverty_rate=0.183,
        img_src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/2000px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg'
    )

    city2 = City(
        name='Los Angeles',
        population=3822238,
        state='California',
        median_income='$76,135',
        unemployment_rate=0.067,
        college_educated_rate=0.382,
        poverty_rate=0.168,
        img_src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hollywood_Sign_%28Zuschnitt%29.jpg/2000px-Hollywood_Sign_%28Zuschnitt%29.jpg'
    )

    city3 = City(
        name='Chicago',
        population=2665039,
        state='Illinois',
        median_income='$70,386',
        unemployment_rate=0.064,
        college_educated_rate=0.437,
        poverty_rate=0.172,
        img_src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Chicago_River_Morning_%2844455011711%29.jpg/2000px-Chicago_River_Morning_%2844455011711%29.jpg'
    )

    # Linking scholarships to cities
    scholarship.cities.append(city1)
    scholarship.cities.append(city2)
    scholarship.cities.append(city3)

    # Committing instances to the database
    db.session.add_all([scholarship, organization1, organization2, city1, city2, city3])
    db.session.commit()







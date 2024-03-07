from models import City, Organization, Scholarship
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class ScholarshipSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Scholarship

class OrganizationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Organization

class CitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = City

scholarship_schema = ScholarshipSchema()
organization_schema = OrganizationSchema()
city_schema = CitySchema()
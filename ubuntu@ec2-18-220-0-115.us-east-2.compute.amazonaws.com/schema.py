from models import City, Organization, Scholarship
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class CitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = City

class OrganizationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Organization

class ScholarshipSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Scholarship

city_schema = CitySchema()
organization_schema = OrganizationSchema()
scholarship_schema = ScholarshipSchema()


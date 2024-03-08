from marshmallow import fields, Schema

class ScholarshipSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    awarded_by = fields.Str()
    award_amount = fields.Int()
    merit_based = fields.Bool()
    need_based = fields.Bool()
    essay_based = fields.Bool()
    nationwide = fields.Bool()
    img_src = fields.Str()
    link = fields.Str()
    cities = fields.Nested(lambda: CitySchema(only=("id", "name")), many=True)
    organizations = fields.Nested(lambda: OrganizationSchema(only=("id", "name")), many=True)

class OrganizationSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    email = fields.Str()
    phone = fields.Str()
    organization_type = fields.Str()
    img_src = fields.Str()
    scholarship_id = fields.Int()
    scholarship = fields.Nested(lambda: ScholarshipSchema(only=("id", "name")), exclude=("organizations",))

class CitySchema(Schema):
    id = fields.Int()
    name = fields.Str()
    population = fields.Int()
    state = fields.Str()
    median_income = fields.Str()
    unemployment_rate = fields.Float()
    college_educated_rate = fields.Float()
    poverty_rate = fields.Float()
    img_src = fields.Str()
    scholarships = fields.Nested(lambda: ScholarshipSchema(only=("id", "name")), many=True)
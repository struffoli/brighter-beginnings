## Canvas / Slack group number:
01

## Team Members
Kevin Xu, Joshua Yu, Tyler Kubecka, Ben Yu, Bryan Lee

## Project Name
BrighterBeginnings

https://brighterbeginnings.me

## Project Description
For K-12 students in low income areas around Texas, we hope to provide easy access to information about resources in particular areas dedicated to helping them, such as free tutoring programs, counseling services, etc. as well as spreading awareness for scholarship programs that can be applied for, centralized in one place.

## URLs of at least three data sources that you will programmatically scrape (at least one must be a RESTful API) (be very sure about this)
 - [sat/act data by state](https://github.com/jasminevasandani/ACT_SAT_Data_Recommendations/tree/master/data)
- [census data api](https://www.census.gov/data/developers/data-sets.html)
- [data on US schools and districts](https://educationdata.urban.org/documentation/index.html)
	- [more (nces)](https://nces.ed.gov/ccd/)
	- [more (public school universe survey)](https://nces.ed.gov/ccd/pubschuniv.asp)
- [search for nonprofits by keyword](https://www.guidestar.org/search)
- [RESTful api to interact with Google Maps](https://tryapis.com/googlemaps)
## At least three models
Cities: Cities in Texas

School Support Orgs/Resources: local tutoring, counseling, etc

Scholarships: Awareness of programs that students in these areas can apply for

## An estimate of the number of instances of each model
50 most populous Cities in texas

100+ organizations around those cities

150+ scholarships for low-income students

## Each model must have many attributes. Describe five of those attributes for each model that you can filter or sort
**Cities:**\
Name\
Population\
Number of schools/districts\
Test scores\
Median income\
Percent Unemployment\
Percent of students on free or reduced lunch\
Percent of adults college educated

**Organizations:**\
Name\
Location\
Distance from user\
Contact Information\
Type of Organization (financial aid, resource aid, educational, etc.)

**Scholarships:**\
Name\
Awarded by\
Area\
Age group\
Award amount\
Number of recipients\
Type(?) (need-based, essay, no essay, etc.)

## Instances of each model must connect to instances of at least two other models
**Cities:**

organizations will be organizable by area, organizations that have data gathered on them will reflect cities analyzed in the map links to organizations (links to organizations)

  

**Scholarships:**

Scholarships are often only available in certain areas, so they will be connected to the locations of the cities (links to cities).

Scholarships that particular organizations have will be listed on their card (links to organizations)

  

## Instances of each model must be rich with different media (e.g., feeds, images, maps, text, videos, etc.) (be very sure about this). Describe two types of media for instances of each model

Cities: Maps, Text

Organizations: Images, text

Scholarships: feed, text

  

## Describe three questions that your site will answer

How does low-income affect students’ educations?

  

How can schools and organizations effectively support the educational and academic success of low income k-12 students?

  

What are some of the ways that I can help support these low income k-12 students?

## API documentation
https://documenter.getpostman.com/view/32954458/2sA2r6WPJG

## Completion time
Estimated time to complete phase 1: 15 hours

Actual time: 25 hours
- Kevin: 5 hours
- Josh: 5 hours
- Tyler: 5 hours
- Ben: 5 hours
- Bryan: 5 hours

Phase leader (Kevin for phase 1) keeps track of current status, watches issues closely, and maintains list of what is left to do.

## Pipeline
https://gitlab.com/kxut/cs373-group-01/-/pipelines

## SHA
Phase 1: a1584d7587415c4e2293578c6dc67e0ff8b8dfd2

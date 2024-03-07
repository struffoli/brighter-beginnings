# from models import app, db, City, Organization, Scholarship
import pandas as pd
import requests

data = {"cities": {}, "orgs": {}, "scholarships": {}}

def standardize_names(name):
    if name == 'Indianapolis city (balance), Indiana':
        return ('Indianapolis', 'Indiana')
    elif 'city' in name:
        return (name[:name.index(' city')], name[name.index('city')+6:])
    elif 'town' in name:
        return (name[:name.index(' town')], name[name.index('town')+6:])
    elif name == 'Nashville-Davidson metropolitan government (balance), Tennessee':
        return ('Nashville', 'Tennessee')
    elif name == 'Louisville/Jefferson County metro government (balance), Kentucky':
        return ('Louisville', 'Kentucky')
    elif name == 'Urban Honolulu CDP, Hawaii':
        return ('Honolulu', 'Hawaii')
    elif name == 'Lexington-Fayette urban county, Kentucky':
        return ('Lexington', 'Kentucky')
    elif name == 'Anchorage municipality, Alaska' or name == 'Anchorage census subarea, Anchorage Municipality, Alaska':
        return ('Anchorage', 'Alaska')
    elif name == 'Augusta-Richmond County consolidated government (balance), Georgia':
        return ('Augusta', 'Georgia')
    else:
        print(name)
        return (None, None)
    
def standardize_wikipedia(name):
    if name == 'New York':
        return 'New York City'
    elif name == 'Boise City':
        return 'Boise'
    elif name == 'St. Paul':
        return 'Saint Paul'
    elif name == 'Washington':
        return 'Washington, D.C.'
    else:
        return name

def cities_pop_and_init():
    df = pd.read_excel('populations.xlsx')
    df = df.sort_values(['Population'], ascending=False).head(153)
    df_cities = df.to_dict('records')

    for i in range(len(df_cities)):
        name = standardize_names(df_cities[i]['City Name'])
        data['cities'][name[0]] = {'population': int(df_cities[i]['Population']), 'state': name[1]}

def cities_income():
    df1 = pd.read_csv('income1.csv')
    df2 = pd.read_csv('income2.csv')

    row1 = df1.iloc[11]
    row2 = df2.iloc[11]

    for name, income in row1.items():
        if name == 'Label (Grouping)':
            continue
        else:
            key = standardize_names(name[:name.index('!')])
            data['cities'][key[0]]['median income'] = income
    for name, income in row2.items():
        if name == 'Label (Grouping)':
            continue
        else:
            key = standardize_names(name[:name.index('!')])
            data['cities'][key[0]]['median income'] = income
    data['cities']['Anchorage']['median income'] = '95,731'

def cities_unemployment():
    df1 = pd.read_csv('unemployment1.csv')
    df2 = pd.read_csv('unemployment2.csv')


    row1 = df1.iloc[9]
    row2 = df2.iloc[9]

    for name, rate in row1.items():
        if name == 'Label (Grouping)':
            continue
        else:
            key = standardize_names(name[:name.index('!')])
            data['cities'][key[0]]['unemployment rate'] = rate
    for name, rate in row2.items():
        if name == 'Label (Grouping)':
            continue
        else:
            key = standardize_names(name[:name.index('!')])
            data['cities'][key[0]]['unemployment rate'] = rate
    data['cities']['Anchorage']['unemployment rate'] = '4.0%'

def cities_education():
    df1 = pd.read_csv('education1.csv')
    df2 = pd.read_csv('education2.csv')


    row1 = df1.iloc[15]
    row2 = df2.iloc[15]

    for name, rate in row1.items():
        if name == 'Label (Grouping)':
            continue
        else:
            key = standardize_names(name[:name.index('!')])
            data['cities'][key[0]]['adults college educated'] = rate
    for name, rate in row2.items():
        if name == 'Label (Grouping)':
            continue
        else:
            key = standardize_names(name[:name.index('!')])
            data['cities'][key[0]]['adults college educated'] = rate
    data['cities']['Anchorage']['adults college educated'] = '37.0%'

def cities_poverty():
    df1 = pd.read_csv('poverty1.csv')
    df2 = pd.read_csv('poverty2.csv')


    row1 = df1.iloc[0]
    row2 = df2.iloc[0]

    for name, rate in row1.items():
        if name == 'Label (Grouping)':
            continue
        else:
            key = standardize_names(name[:name.index('!')])
            data['cities'][key[0]]['poverty rate'] = rate
    for name, rate in row2.items():
        if name == 'Label (Grouping)':
            continue
        else:
            key = standardize_names(name[:name.index('!')])
            data['cities'][key[0]]['poverty rate'] = rate
    data['cities']['Anchorage']['poverty rate'] = '9.6%'

def get_images():
    url = "https://en.wikipedia.org/w/api.php"

    for city in data['cities'].keys():
        standardized = standardize_wikipedia(city)
        name = standardized + ", " + data['cities'][city]['state']
        params = {
            "action": "query",
            "format": "json",
            "formatversion": "2",
            "prop": "pageimages",
            "titles": name,
            'piprop': 'thumbnail',
            'pithumbsize': '2000'
        }

        response = requests.get(url = url, params = params)
        wiki_data = response.json()
        # print(wiki_data)
        try:
            file_src = wiki_data["query"]["pages"][0]["thumbnail"]["source"]
            data['cities'][city]['image_src'] = file_src
            # print(file_src)
        except:
            params = {
                "action": "query",
                "format": "json",
                "formatversion": "2",
                "prop": "pageimages",
                "titles": standardized,
                'piprop': 'thumbnail',
                'pithumbsize': '2000'
            }

            response = requests.get(url = url, params = params)
            wiki_data = response.json()
            try:
                file_src = wiki_data["query"]["pages"][0]["thumbnail"]["source"]
                data['cities'][city]['image_src'] = file_src
                # print(file_src)
            except:
                print("~~~~~~~~NONSTANDARD CITY: " + standardized + "~~~~~~~~")    
    
cities_pop_and_init()
cities_income()
cities_unemployment()
cities_education()
cities_poverty()
get_images()

df_cities = pd.DataFrame(data['cities']).T
df_cities.to_excel('cities.xlsx')
df_cities.to_csv('cities.csv')
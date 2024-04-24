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

    with open('org_pairs.txt') as file:
        pairs = []
        for i in range(50):
            tuple_str = file.readline()
            pair = ast.literal_eval(tuple_str)
            pairs.append(pair)
        # Now match org pairs to 3 nearest cities

        groups = []
        unmatched_cities = cities.copy()
        
        while unmatched_cities:
            # Find 3 cities closest to an org pair (just use the first org in the pair)
            org_pair = pairs.pop(0)
            distances = []

            for city in unmatched_cities:
                distance = get_distance(org_pair[0]["address"], city["name"] + ", " + city["state"], "AIzaSyD7niW97aGw6jUpDAucOAEBCXxnM9zmx-E")
                distances.append((city, distance))
            
            distances.sort(key=lambda x: x[1])
            group = (scholarships[len(groups)], org_pair[0], org_pair[1], distances[0][0], distances[1][0], distances[2][0])
            groups.append(group)
            unmatched_cities.remove(distances[0][0])
            unmatched_cities.remove(distances[1][0])
            unmatched_cities.remove(distances[2][0])
            print(group)
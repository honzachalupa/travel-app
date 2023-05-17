import { EPlaceTypes } from "@/types/map";

export const placePrompt = (query: string) => {
    const typesList = Object.keys(EPlaceTypes);

    return `
        Search for a place "${query}" and get data stated below.

        Rules:
        Value of "name" is as general as possible.
        Value of "description" is description of the place - something about the history of the place or generally what visitor can expect from the visit.
        Value of "type" is type of place - select from the array [${typesList}] or use null.
        Value of "street" should not contain the house number;
        If value of "country" equals "Czechia" or "Česko", replace it with "Česká Republika".
        Value of "instagramUrl" is URL address to Instagram profile of the place.
        Translate name and description texts to Czech language.
        Coordinates are in WGS84 format.
        Try find as many information as possible.
        If any of the values can't ve found, return null.

        Structure of JSON response object:
        {
            "name": "{{value}}",
            "description": "{{value}}",
            "type": "{{value}}",
            "coordinates": {
                "longitude": {{value}},
                "latitude": {{value}}
            },
            "address": {
                "street": "{{value}}",
                "houseNumber": {{value}},
                "city": "{{value}}",
                "country": "{{value}"}
            },
            "contact": {
                "phoneNumber": "{{value}}",
                "emailAddress": "{{value}}",
                "url": {{value}},
                "instagramUrl": "{{value}}"
            }
        }

        [no prose]
    `
        .replace(/\s{2,}/g, " ")
        .replace(/\n+/g, "")
        .replace(/\t+/g, "")
        .replace(/"/g, "'")
        .trim();
};

/* Search for place "${placeQuery}".

Rules:
Value of Name is as general as possible.
Value of Description is description of the place - i.e. something about the history or generally what visitor can expect from the visit.
Value of Type is type of place - select from the array [${Object.keys(
    EPlaceTypes
)}] or use null.
Value of Street should not contain the house number;
Translate all texts to Czech language if there is translation available - otherwise use English.
Coordinates are in WGS84 format.
If any of the values can't ve found, return null.

Output JSON structure:
{
    name: {{value}},
    description: {{value}},
    type: {{value}},
    coordinates: {
        longitude: {{value}},
        latitude: {{value}}
    },
    address: {
        street: {{value}},
        houseNumber: {{value}},
        city: {{value}},
        country: {{value}}
    },
    contact: {
        phoneNumber: {{value}},
        emailAddress: {{value}}
    }
}

[no prose] */

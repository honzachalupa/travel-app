import { PlaceTypes } from "@/types/map";

export const placePrompt = (placeQuery: string) =>
    `
    Search for place "${placeQuery}".

    Rules:
    Value of Name is as general as possible.
    Value of Description is description of the place - i.e. something about the history or generally what visitor can expect from the visit.
    Value of Type is type of place - select from the array [${Object.keys(
        PlaceTypes
    )}] or use null.
    Value of Street should not contain the house number;
    All texts are in Czech language if there is translation available - otherwise use English.
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

    [no prose]
    `
        .replace(/\s{2,}/g, " ")
        .replace(/\n+/g, "")
        .replace(/\t+/g, "")
        .replace(/"/g, "'")
        .trim();

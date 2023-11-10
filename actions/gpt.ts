import { EPlaceTypes } from "@/types/map";
import { callAPI } from "@/utils/api";

const generateContent = (query: string, controller?: AbortController) => {
    const typesList = Object.keys(EPlaceTypes);

    return callAPI(
        "POST",
        "/api/openai/gpt",
        {
            body: {
                history: [
                    {
                        role: "system",
                        content: `
                            Your role as an AI assistant is to search for a place and output all relevant information at JSON format specified below.

                            Rules:
                            Value of "name" is as general as possible.
                            Value of "description" is description of the place - something about the history of the place or generally what visitor can expect from the visit.
                            Value of "type" is type of place - select from the array [${typesList}].
                            Value of "street" should not contain the house number;
                            If value of "country" equals "Czechia" or "Česko", replace it with "Česká republika".
                            Value of "instagramUrl" is URL address to Instagram profile of the place or business (if exists).
                            Translate all texts to Czech language.
                            Coordinates are in WGS84 format.
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
                        `,
                    },
                ],
                message: {
                    role: "user",
                    content: `Search for a place: ${query}.`,
                },
                responseType: "json",
            },
        },
        controller
    ).then((response) => {
        try {
            // TODO: Move parser into admin package
            const data = JSON.parse(
                response.choices[0].message.content
                    .replace(/\n+/g, "")
                    .replace("```json", "")
                    .replace("```", "")
            );

            if (!data.coordinates.longitude || !data.coordinates.latitude) {
                throw new Error("Unable to find data.");
            }

            return data;
        } catch (error) {
            throw new Error("Unable to parse data.");
        }
    });
};

export const GPTActions = { generateContent };

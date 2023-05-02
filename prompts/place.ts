import { PlaceTypes } from "@/types/map";

export const placePrompt = (placeQuery: string) =>
    `
    Najdi informace o místě "${placeQuery}".

    Pravidla:
    Hodnota Name je obecná.
    Hodnota Description je popis místa - tedy něco o historii nebo obecně o tom, co návštěvník může od návštěvy očekávat.
    Hodnota Type je typ místa - vyber z pole [${Object.keys(
        PlaceTypes
    )}] nebo použij hodnotu "other".
    Hodnota Street neobsahuje číslo domu.
    Pokud je hodnota Country rovna "Czechia" nebo "Česko", použij místo toho "Česká Republika"
    Přelož všechny texty do češtiny, pokud je překlad k dispozici - jinak použij angličtinu.
    Koordináty jsou ve formátu WGS84.
    Pokud některá z hodnot není nalezena, vrať hodnotu null.

    Struktura JSON objektu odpovědi:
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
            emailAddress: {{value}},
            url: {{value}}
        }
    }

    [no prose]
    `
        .replace(/\s{2,}/g, " ")
        .replace(/\n+/g, "")
        .replace(/\t+/g, "")
        .replace(/"/g, "'")
        .trim();

/* Search for place "${placeQuery}".

Rules:
Value of Name is as general as possible.
Value of Description is description of the place - i.e. something about the history or generally what visitor can expect from the visit.
Value of Type is type of place - select from the array [${Object.keys(
    PlaceTypes
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

import { DifficultyCodes } from "Interfaces/Difficulty";
import { IPlace } from "Interfaces/Place";

const rawData = {
    "type": "FeatureCollection",
    "name": "To-visit",
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    },
    "features": [
        {
            "type": "Feature",
            "properties": {
                "Name": "Adršpach",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.1228549,
                    50.615305
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Liberec",
                "description": "Aquapark, centrum"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.0515914,
                    50.759441
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ještěd",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.9845791,
                    50.7326118
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Spišský hrad",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    20.7675076,
                    48.9990566
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Solný důl Wieliczka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    20.0537965,
                    49.9834763
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ďurkovec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    20.4769653,
                    48.9467972
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kláštorisko",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    20.4217386,
                    48.9439997
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Těšín",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.625946,
                    49.7487762
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ostrava",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.2918072,
                    49.8356574
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Olomouc",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.2593498,
                    49.5889034
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Osvětim",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    19.1811204,
                    50.0344438
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Pramen labe",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.5361754,
                    50.7756349
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Stezka v oblacích - Dolní Morava\n",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.798954,
                    50.1206882
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bieszczady Mountains",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    22.522579700000101,
                    49.2770726
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Písečný přesyp u Vlkova",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.714711399999899,
                    49.1592445
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Prales Mionší",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.6607618,
                    49.5322179
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mohelenská hadcová step",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.182234800000099,
                    49.1069229
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Pančavský vodopád",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.5451048,
                    50.7611441
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Soos",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.401714,
                    50.1461748
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Pravčická brána",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2815093,
                    50.8839207
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Boubínský prales",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8124927,
                    48.9804902
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Milešovka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9311631,
                    50.5548254
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bratislava",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.1071469,
                    48.1420392
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Budapešť",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    19.040235,
                    47.497912
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Berlín",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.404954,
                    52.5200066
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Besucherbergwerk F60",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.777198,
                    51.586563
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Drážďany",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7372621,
                    51.0504088
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Brno",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.6068371,
                    49.1950602
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Aš",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.1950127,
                    50.2238827
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zámek Žďár nad Sázavou",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.936911,
                    49.581956
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zřícenina Sion",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.2109676,
                    49.8892022
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Původní dálniční mosty D1",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.0964594,
                    49.7029179
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kouřim",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.9770368,
                    50.0030583
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Český Šternberk",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.9281555,
                    49.8108906
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Beroun",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.0862836,
                    49.9672047
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Solvayovy doly",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1430169,
                    49.9726766
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Koněpruské jeskyně",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.0687788,
                    49.9161691
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Orlík nad Vltavou",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1655127,
                    49.5098791
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Tatry",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    20.0442995,
                    49.1556982
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Západní Tatry",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    19.7484701,
                    49.196928
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Biograd na Moru",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.4435586,
                    43.9373047
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ženeva",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.1431577,
                    46.2043907
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hel",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.8007998,
                    54.6083804
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Norimberk",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    11.0766941,
                    49.4518081
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Regensburg",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.1016236,
                    49.0134297
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Amsterdam",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.8951679,
                    52.3702157
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hallstatt",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.6492617,
                    47.5622342
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Salzburg",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.05501,
                    47.80949
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Palcmanská Maša",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    20.380231,
                    48.8625727
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Chopok",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    19.5900273,
                    48.9433925
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Liptovský Trnovec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    19.5459492,
                    49.1102679
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lednicko-valtický areál",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.8120501,
                    48.8079776
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mělník",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4817813,
                    50.3539017
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Říp",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2895199,
                    50.3866969
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Macocha",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.7347222,
                    49.3733333
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jihlava",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.5870415,
                    49.3983782
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hornický skanzen důl Mayrau",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.0841218,
                    50.1659175
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lhota",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.498771600000101,
                    50.5686602
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lom Srní",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.8815956,
                    49.7773844
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dlouhý rybník",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.8162785,
                    49.7535592
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Soběšín",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.9820685,
                    49.7944803
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lovoš",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.0186111,
                    50.5275
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Plzeň",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.3736371,
                    49.7384314
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Techmania Science Center",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.3622256,
                    49.7405352
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "iQLANDIA",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.052959,
                    50.760558
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Obří akvárium Hradec Králové",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.8188677000001,
                    50.2046163
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Innsbruck",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    11.404102400000101,
                    47.2692124
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Živohošť",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4230318,
                    49.7576765
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Škoda Muzeum",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.913579,
                    50.41873
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mladá Boleslav",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.908438,
                    50.4134249
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Drábské světničky",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.0319531,
                    50.5314068
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hrad Trosky",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.2308401,
                    50.5165389
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bastei",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.0731656,
                    50.9619121
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vídeň",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.3741622,
                    48.2084031
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Apetlon",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.8305366,
                    47.7458991
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Trenčínský hrad",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.0447491,
                    48.8941247
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Molpír",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.423611,
                    48.510833
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Stezka v korunách stromů - Krkonoše",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.7818159,
                    50.6310877
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyžlovka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.789095,
                    49.9846524
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Koupaliště Vyžlovka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.7816002,
                    49.9814985
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Prachovské skály",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.2849749,
                    50.468302
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Karlovy Vary",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.8719616,
                    50.2318521
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Český Krumlov",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3174657,
                    48.8127354
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Křišťanovice",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9375198,
                    48.9685407
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Prachatice",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.000000499999899,
                    49.01091
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Frymburk",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1656315,
                    48.6609442
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Monte Piana",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.2446488,
                    46.6265684
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rifugio Lagazuoi",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.008085,
                    46.527944
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Cinque Torri",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.0515668,
                    46.5098675
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Cortina d'Ampezzo",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.1356524,
                    46.5404711
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Cascate di Fanes",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.0840158,
                    46.5942482
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rotterdam",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.4777325,
                    51.9244201
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Haag",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.30508340000006,
                    52.0740136
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Londýn",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -0.127758299999982,
                    51.5073509
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Edinburgh",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -3.188267,
                    55.953252
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Glasgow",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -4.251806,
                    55.864237
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Brighton",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -0.137163,
                    50.82253
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Island",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -19.020835,
                    64.963051
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Portugalsko",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -8.224454,
                    39.399872
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Plitvička Jezera",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.6210837,
                    44.8807696
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Sněžka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.7399457,
                    50.7360171
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Baumwipfelpfad Bayerischer Wald",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.4872266,
                    48.8907487
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Singltrek pod Smrkem",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.194521,
                    50.8940332
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jestřebí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5845567,
                    50.608594
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lom Ještřebí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5869684,
                    50.6213567
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bezděz",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.7219841,
                    50.5336423
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Poděbrady",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.1188883,
                    50.1424249
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mariánské Lázně",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.7011977,
                    49.9645986
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Triglav National Park",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7521362,
                    46.3886223
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Monaco",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.4283886,
                    43.739042
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Curych",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.541694,
                    47.3768866
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Babylon Liberec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.0514848,
                    50.7609141
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Liberec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.0543387,
                    50.76628
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hluboká nad Vltavou",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4342708,
                    49.0522544
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lom Velká Amerika",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2034394,
                    49.9613288
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Essen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.0115552,
                    51.4556432
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Donauturm",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.4098739,
                    48.2403447
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Horská Kvilda",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.5579749,
                    49.0576207
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Tropical Islands",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.748617,
                    52.038924
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Teufelsberg",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.2411111,
                    52.4972222
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Linec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.28583,
                    48.30694
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Palma",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.65016030000004,
                    39.5696005
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Norsko",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.8876953,
                    62.5325943
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Strovmová stezka - Knechtelsdorf",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.6628245,
                    48.4495818
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Karlštejn",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.183651300000101,
                    49.9338529
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Oregon",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -120.5542012,
                    43.8041334
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Los Angeles",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -118.2436849,
                    34.0522342
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Las Vegas",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -115.1398296,
                    36.1699412
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "San Francisco",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -122.4194155,
                    37.7749295
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vancouver",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -122.6716063,
                    45.6318397
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Britská Kolumbie",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -127.6476206,
                    53.7266683
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Washington",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -120.7401386,
                    47.7510741
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Seattle",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -122.3320708,
                    47.6062095
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Forks",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -124.3854867,
                    47.950355
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Yellowstone National Park",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -110.5884542,
                    44.4279684
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "New York",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -74.0059413,
                    40.7127837
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Prefektura Tokio",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    139.691706399999987,
                    35.6894875
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Songdo",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    126.6438546,
                    37.3839118
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Karibik",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.657183,
                    22.5062039
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mexiko (severozápad)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -109.4816916,
                    28.9637216
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Split",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.4401935,
                    43.5081323
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zadar",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.2313648,
                    44.119371
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Makarska",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.021523899999899,
                    43.2937769
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Sveti Jure",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.0538712,
                    43.3423145
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Krvavica",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.9851133,
                    43.3262634
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Primošten",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.9230156,
                    43.586316
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Baarle-Hertog",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.931736,
                    51.441832
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Cerhenice (testovací železniční okruh)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.0852148,
                    50.0834486
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Predjamský hrad",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1267154,
                    45.8158473
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Humprecht",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.1697879,
                    50.4703761
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Benátky",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.3149872,
                    45.4415853
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Skagen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.6533051,
                    57.74503
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Pustevny",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.2658,
                    49.4903
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Radhošť",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.224094299999901,
                    49.4935565
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bezručova chata",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.4477287,
                    49.5454403
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Černé jezero",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.1823088,
                    49.179435
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rakotzbrücke",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.6404953,
                    51.5363263
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Terst",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7833072,
                    45.6894823
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Soutok Rhôna a Arve",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.1208885,
                    46.2010088
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dlouhé stráně",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.159104,
                    50.0746794
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Maracaibo",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -71.5769,
                    10.0278
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rheinstein",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.858097,
                    49.993812
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Crooked Forest",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4757305000001,
                    53.214163
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Údolí smrti",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -116.9325408,
                    36.5322649
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Little A'Le'Inn",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -115.7458847,
                    37.646816
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Nový Zéland",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    172.363193200000012,
                    -42.5791961
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Havaj",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -155.5827818,
                    19.8967662
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Izrael",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    34.851612,
                    31.046051
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dubaj",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    55.2707828,
                    25.2048493
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Karaganda",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    71.7706807,
                    47.9022182
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Pražský hrad",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.399579200000099,
                    50.0902163
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyšehrad - Katakomby",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4191909,
                    50.0653694
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Čičmany",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.515946,
                    48.9550537
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Tbilisi",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    44.827096,
                    41.7151377
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kutaisi",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    42.7180019,
                    42.2662428
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Samegrelo-Horní Svanetie",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    42.1689362,
                    42.7352247
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Gudauri",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    44.4804723,
                    42.4755394
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ertwitte",
                "description": "Místo na focení"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.372512,
                    51.5868
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Miniatur Wunderland",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.9885157,
                    53.5437292
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kokořín",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5769618,
                    50.4403866
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kölnbrein Dam",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.339167,
                    47.079167
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vojslavický dvojmost",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.2071172,
                    49.5960855
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Temelín",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3487467,
                    49.1928402
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "BMW-Museum",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    11.5574011,
                    48.1773115
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mercedes-Benz Museum",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.233982,
                    48.7881453
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "The Transparent Glass Car Factory",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7561596,
                    51.0449885
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "German Hygiene Museum",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.745931,
                    51.044573
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bratislavský hrad",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.1000051,
                    48.1422366
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídková vež UFO",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.1047044,
                    48.1377261
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mikulov",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.6376881,
                    48.805283
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Aquapark Pasohlávky",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.5766525,
                    48.9037153
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ústí nad Labem",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.039198,
                    50.6600282
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Větruše (lanovka)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.039722,
                    50.655
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Boreč",
                "description": "Kouřící kopec"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.988611,
                    50.514722
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zřícenina hradu Opárno",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.0099184000001,
                    50.5423168
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Oltářík",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9233329,
                    50.49
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Košťálov",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9847112,
                    50.4901612
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zřícenina Valdek",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.89336,
                    49.775077
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bývalé letiště pod Hejlákem",
                "description": "Nejkratší cesta vede ze Zaječova. Z něj stoupejte po silnici stále vzhůru, až dojdete k rozcestí U Bílého křížku. Zde odbočte na kostkami zpevněnou silnici vpravo. Ze závory a strážního domku si dnes již nemusíte nic dělat. Po dvou kilometrech stoupání vás cesta dovede k letišti, jež rozděluje na dvě poloviny."
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.871967600000101,
                    49.7489922
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hrad Zvíkov",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1921586,
                    49.4390467
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Varvažov",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.142404,
                    49.421473
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ostrá",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.96649,
                    48.9189567
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Tlstá",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.9713824,
                    48.9340929
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Blatnica",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.924667499999899,
                    48.9395026
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Gaderska Dolina",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.9769444,
                    48.9533333
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vodní nádrž Souš",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.3188306,
                    50.7903413
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Desná - Protržená přehrada",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.2773353,
                    50.8010609
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Caño Cristales",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -73.794467,
                    2.264208
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Retba",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -17.2341324,
                    14.8387836
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Eye of the Sahara",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -11.402092,
                    21.1267786
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Socotra",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    53.8237385,
                    12.4634205
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Darvaza",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    58.4116291,
                    40.180991
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Marietas Islands",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -105.5668508,
                    20.7039774
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Harasov",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5705736,
                    50.4110887
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Národní park Bryce Canyon",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -112.1870895,
                    37.5930377
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Arashiyama Bamboo Grove",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    135.671873799999986,
                    35.0170421
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Singapur",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    103.819836,
                    1.352083
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Marina Bay Sands",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    103.8600439,
                    1.28315
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Soutok Dunaje a Drávy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.9248514,
                    45.5452823
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bled (Blejsko jezero)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1099449,
                    46.3676751
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vranov a Malá skála",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.1891887,
                    50.6419428
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bachledova dolina",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    20.307269899999898,
                    49.27282
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Pamukkale",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    29.1236879,
                    37.9214147
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Důl Mauritius",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.8313375,
                    50.3860516
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Maledivy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    73.22068,
                    3.202778
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídka Máj",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.455636599999901,
                    49.8312492
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Smetanova vyhlídka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4522223,
                    49.8484454
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Slapská přehrada",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4346055,
                    49.8237111
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Okolí Štěchovic",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4402409,
                    49.8442927
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Žižkovský vysílač",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4513890000001,
                    50.080833
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Petřínská rozhledna",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3950837,
                    50.083527
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Petřín",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3990797,
                    50.0807112
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Obora Hvězda",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.327525,
                    50.0831423
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Divoká Šárka (skála)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.32055,
                    50.0962063
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Divoká Šárka (údolí)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3318367,
                    50.1026479
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Stromovka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4197488,
                    50.1069144
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Trojský zámek",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4128609,
                    50.1164642
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zoologická zahrada Praha",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4108438,
                    50.1170146
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bohnická vyhlídka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4045997,
                    50.1291074
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Čimické údolí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4125175,
                    50.1427923
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ďáblický háj",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4620419,
                    50.1369749
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bobová dráha Prosek",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4892287,
                    50.1141939
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jenštejn",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.6112263,
                    50.1533868
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zámek Ctěnice",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5641804,
                    50.1489114
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kyje",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5502758,
                    50.1013679
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dolní Počernice",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5796299,
                    50.0882632
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hostivař",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.530406,
                    50.0428919
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hostivař (obejít celou přehradu)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5497608,
                    50.0368557
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mini-zoo Hostivař",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.5226166,
                    50.0365644
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kunratický les",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4708824,
                    50.0285857
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Modřanská rokle",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4499397,
                    50.0025535
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Závist",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4081831,
                    49.9623192
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Děvín",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3981409,
                    50.0464196
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Prokopské údolí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.375267,
                    50.0410178
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dalejské údolí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3364286,
                    50.0310118
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ladronka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3635941,
                    50.079286
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Břevovský klášter",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3569851,
                    50.0845045
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kajetánka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.37428,
                    50.0878088
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Letná",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4159508,
                    50.0947609
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Národní technické muzeum",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4248343,
                    50.0975002
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vítkov",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4490385,
                    50.0884972
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Parukářka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4603252,
                    50.084835
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Slatiny",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4807959,
                    50.0612164
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Údolí Kocáby",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3525434,
                    49.8332769
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Údolí Kocáby (2)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3917438,
                    49.8445331
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Madagaskar",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    46.869107,
                    -18.766947
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dulce",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -106.9989265,
                    36.9336211
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kittelovo muzeum",
                "description": "https:\/\/www.playtvak.cz\/tajemny-kitteluv-dum-zde-se-upisovalo-dablu-fz5-\/tajemna-mista-cr.aspx?c=A161222_175225_tajemna-mista-cr_kuko"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.214894,
                    50.694626
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kostel sv. Jiří",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.160571500000099,
                    50.016486
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kostel svaté Anny",
                "description": "Maturitní projekt"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.2391498,
                    50.6447979
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zlín",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.6627635,
                    49.2244365
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Býčí skála",
                "description": "https:\/\/www.playtvak.cz\/v-byci-skale-u-brna-se-nasly-kostry-desitek-lidi-fr6-\/tajemna-mista-cr.aspx?c=A160812_092750_tajemna-mista-cr_holy"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.6948318,
                    49.3074346
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Branišovský les",
                "description": "https:\/\/www.playtvak.cz\/les-sebevrahu-u-budejovic-misto-plne-legend-fed-\/tajemna-mista-cr.aspx?c=A161103_144350_tajemna-mista-cr_kuko"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4228772,
                    48.9795551
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kamenný pastýř",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.984492600000101,
                    50.3012681
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Veřejová skála",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.8688523000001,
                    49.6459557
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Blaník",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.8727417,
                    49.6421508
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Oldřichův dub",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9627222,
                    50.3459558
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vrch Náklo",
                "description": "Vrch Náklo (265 m) najdete nedaleko obcí Ratíškovice a Milotice. Své okolí převyšuje asi o 58 metrů a z jeho vrcholu jsou hezké rozhledy směrem na Chřiby i Bílé Karpaty. Právě zde se mohlo, dle jedné z teorií popularizované především Janem Galatíkem, v minulosti nacházet bájné slovanské megaměsto Veligrad. Podle písemných pramenů mělo jít o tehdejší megaměsto s výjimečným vzhledem.<br>Jan Galatík se také rozhodl jít po stopách perských kupců a z překladu písemných pramenů získával další informace o podobě megaměsta, které je popsáno jako místo s nedobytnými hradbami a zároveň je jeho část umístěna pod povrchem země.<br>Svoji teorii podpořil i leteckou archeologií, díky které zjistil, že u kóty 218 se nachází silueta bývalé stavby o půdorysu cca 80 m x 40 m, připomínající obrovský chrám, kam by se vešlo až 4 000 lidí. To vede pana Galatíka k doměnce, že by se mohlo jednat o hledaný Velký Moravský chrám, kde byl pohřben sv. Metoděj. V rámci letecké archeologie zde byly objeveny i další půdorysy staveb, možná i Svatoplukův chrám v podobě věže.<br>Zdroj: https:\/\/cestovani.idnes.cz\/poodhalte-rousku-zahad-a-tajemstvi-a-objevujte-tajemna-mista-ceska-1di-\/kudyznudy.aspx?c=A140430_161511_ig_sdeleni_bes"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.1360326,
                    48.9382035
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Panenský Týnec (nedostavěný gotický kostel)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9165235,
                    50.2960804
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ostrov Hornos",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -67.2919464,
                    -55.9801374
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jihlavské podzemí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.5913912,
                    49.3969422
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Antýgl",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.5113277,
                    49.0577914
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jezerní slať",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.5748529,
                    49.0387401
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Tříjezerní slať",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.4685823,
                    49.0416278
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hrad Kašperk",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.5638526,
                    49.1660839
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lipno nad Vltavou",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2293199000001,
                    48.6393267
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lipno - Marína",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2208576,
                    48.6402821
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vřesná",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1621035000001,
                    48.6823624
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jelení vrchy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.878677,
                    48.815888
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Stezka korunami stromů Lipno",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2307265,
                    48.6526985
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Srní - Vlčí výběh",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.4865536,
                    49.0757719
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ostrovec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1155085,
                    49.4210991
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Pustý Hrádek",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.5695207,
                    49.1652796
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zámek Blatná",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.879437000000101,
                    49.422842
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lidice",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1981167,
                    50.1425363
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Solenická podkova",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2017449,
                    49.6257364
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Passau",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.4730148,
                    48.5743356
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zoo Zlín",
                "description": "Možnost krmení rejnoků."
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.7178037,
                    49.2733104
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mostar",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.8077578,
                    43.3437748
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hříměždice (lom)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2800808,
                    49.6898711
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hrad Křivoklát",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8724605,
                    50.0376417
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vraní skála",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9421779,
                    49.927999
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Skryje",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7666686,
                    49.9646699
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Great Meteor",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.6265973,
                    39.7263669
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "East End of Rundle",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -115.418056,
                    51.083333
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Long Island's end",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -71.8629456,
                    41.0710691
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dachstein-Gletscher (Schladming-Dachstein)",
                "description": "Suspension Bridge, Stairway to Nothingness, Ice Palace, Sky Walk"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.6180681,
                    47.451105
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hvězdárna a planetárium Brno",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.583882,
                    49.20416
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bora-Bora",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -151.7414904,
                    -16.5004126
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Formentera",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    1.45313550000003,
                    38.6964006
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dvůr Králové - Safari zoo",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.7973582,
                    50.4344898
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mont-Saint-Michel",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -1.511457,
                    48.636063
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rozhledna Doubravka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.557253,
                    50.0971438
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Klášter Rosa coeli",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.4714624000001,
                    49.068812
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Babiččino údolí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.052646,
                    50.415018
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Planetárium Praha",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.427516,
                    50.10553
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Poutní kostel sv. Jana Nepomuckého na Zelené hoře",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.9419983,
                    49.5801809
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Salto Angel",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -62.5352543,
                    5.9675753
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hazmburk",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.01434,
                    50.4343345
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lipská hora",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9136088,
                    50.5127006
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rozhledna - Havířská Bouda",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.2850723,
                    49.9707093
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kostnice Sedlec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.288043,
                    49.9617819
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Chrám svaté Barbory",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.2636369,
                    49.9449401
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Třístoličník",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8034442,
                    48.7808574
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Park Boheminium",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.710001599999901,
                    49.9775259
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Barcelona",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.1734035,
                    41.3850639
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Viadukt Millau",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    3.02283880000005,
                    44.0774541
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Klein Matterhorn",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.729619,
                    45.9390618
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Monument Valley",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -110.0984574,
                    36.9980285
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Nordkapp",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    25.7836599,
                    71.1709533
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vodopád Vøringsfossen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.25146580000001,
                    60.4265721
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Cesta Trolů - Trollstigen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.67037860000005,
                    62.4599516
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Geiranger",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.20589410000002,
                    62.1008441
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vodopád Kjosfossen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.13793750000002,
                    60.745845
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vodopád Låtefossen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.584262,
                    59.9478293
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Stalheimskleiva",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.68827050000004,
                    60.8384704
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vodopád Steinsdalsfossen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.1029698,
                    60.3708428
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Nærøyfjord",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.9678137,
                    60.9633466
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vodopád Tvindefossen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.48567920000005,
                    60.7261178
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Sognefjell",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.0062942,
                    61.5658198
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ledovec Briksdalsbreen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.8902016,
                    61.6660182
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "The Atlantic Road",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.35474450000004,
                    63.0167526
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídka Fjellstua Aksla",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.164196,
                    62.47421
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ledovec Bøyabreen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.7636907,
                    61.4959538
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Dalsnibba",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.269322,
                    62.0488015
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Národní park Rondane",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.788880899999979,
                    61.9315164
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Preikestolen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    6.1904396,
                    58.98641
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vodopád Laksforsen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.2914797,
                    65.6237251
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Fossen bratte",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    5.88555670000005,
                    60.381056
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Verdens Ende",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.406343,
                    59.061794
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Maják Lindesnes",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.0467483,
                    57.9824995
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Torghatten",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.089192,
                    65.3966635
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ledovec Nigardsbreen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.1816824,
                    61.6924154
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Oslo",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.7522454,
                    59.9138688
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kodaň",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.5683372,
                    55.6760968
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Stockholm",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.068580800000099,
                    59.3293235
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Visby",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.29484,
                    57.6348
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Karlskrona",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.5869001,
                    56.161224
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Důl Falu",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.616581799999899,
                    60.6002163
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Engelsberg Ironworks",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.0107809,
                    59.967375
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "World Heritage Grimeton Radio Station",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.4050986,
                    57.1131766
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Most přes Öresund",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.8486371,
                    55.5706287
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Öland",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.6364773,
                    56.6648948
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vänern",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.6255108,
                    59.0319601
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Národní park Abisko",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.685016899999901,
                    68.3187659
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Muzeum Vasa",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.0913964,
                    59.3280233
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Drottningholmský palác",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.886825300000101,
                    59.3216935
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Skogskyrkogården",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    18.1027507,
                    59.2712414
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zábavní park Tivoli",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.5681471,
                    55.6736841
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Amalienborg Slotsplads",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.593632699999899,
                    55.6837912
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rosenborg Castle",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.5774171,
                    55.6856841
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Church of Our Lady",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.5730482,
                    55.6794253
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Grundtvigs Kirke",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.533707999999899,
                    55.7165482
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "National Museum of Denmark",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.574741,
                    55.6746479
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kronborg",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.6211552,
                    56.0390142
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Roskilde Cathedral",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.0805245,
                    55.6426323
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Egeskov Castle",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.4902161,
                    55.1761982
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Christiansfeld",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.486305,
                    55.356653
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Stevns Klint",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.444951,
                    55.2795375
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Legoland Billund",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.12680460000001,
                    55.7355109
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lindholm Høje",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.91251880000004,
                    57.0767921
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kaprun",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.759674,
                    47.2728876
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Aspen",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -106.8175387,
                    39.1910983
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hohenzollern Castle",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.967403500000049,
                    48.3235588
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Chandra Bali Villas",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    115.159397,
                    -8.687672
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hlinsko",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.906135,
                    49.763219
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Telč",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.4542731,
                    49.1832383
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Devět skal",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.0319982,
                    49.6704818
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lisovská skála",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.0376801,
                    49.6617488
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zell am See",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.7979355,
                    47.3243639
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hévíz",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.1928296,
                    46.7867275
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Národní muzeum",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4309209,
                    50.0789482
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Knížecí pláně",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.6261388,
                    48.9574429
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Trojmezná hora",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8507746,
                    48.7758387
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Schloss Pillnitz",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8711567,
                    51.0083427
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lingnerschloss",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7976986,
                    51.0640652
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hotel Schloss Eckberg",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.799441,
                    51.0635454
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Albrechtsberg Palace",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7942993,
                    51.0648047
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Technische Sammlungen Dresden",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7976325,
                    51.0420158
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Stone Peñol",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -75.1791102,
                    6.2202694
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kakslauttanen Arctic Resort West Village",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    27.278869100000101,
                    68.3283618
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Poledník",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.3951509,
                    49.0640925
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bikepark Špičák",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.216879,
                    49.1676175
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Palisáda Netolice",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.200386799999899,
                    49.0507961
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bobová dráha Lipno",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2218286,
                    48.6466907
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hrad Rabí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.618524,
                    49.2791829
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Plechý",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8584972,
                    48.7714186
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Velká Deštná",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.3977778,
                    50.3022222
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Boží Dar",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.9244707,
                    50.4097443
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Čertovo jezero",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.1969195,
                    49.165161
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Plešné jezero",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8676495,
                    48.7776672
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jezero Braies",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.0854273,
                    46.694333
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hrad Loket",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.7543565,
                    50.1869974
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Geierlay Suspension Bridge",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.34258640000007,
                    50.0917778
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hranice ČR+DE+AT",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8395266,
                    48.771666
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Autódromo de Sitges-Terramar",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    1.778995,
                    41.236823
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Faunapark",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.1122252,
                    50.2247909
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Milčany",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.47664,
                    50.6212844
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kemp Opárno",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.0210275,
                    50.5421994
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kemp Zdoňov",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.147035,
                    50.6525691
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Šumperk",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.9713891,
                    49.9652549
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "La Paz",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -68.1192936,
                    -16.489689
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Grüner See",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.0557646,
                    47.5415625
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kostel Nanebevzetí Panny Marie",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.550451399999901,
                    50.2150147
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kamenné řady u Kounova",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.6944194,
                    50.2256821
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hrad Houska",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.6239718,
                    50.4908919
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Máchovo jezero",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.6413197,
                    50.5841075
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Moritzburg",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.6794526,
                    51.1676051
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Raná",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7671713,
                    50.4035785
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Marsa Alam",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    34.8789697,
                    25.0676256
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ronda",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -5.16122510000002,
                    36.746209
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Palaiochora",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    23.6819128,
                    35.2294606
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Caminito del Rey",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -4.78996,
                    36.9321024
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Čertovy hlavy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.464595,
                    50.420372
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rezervace divokých koní Milovice",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.8903425,
                    50.2339417
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rozhledna Špulka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.8257923,
                    49.7935505
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Naučná stezka Svatojánské proudy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4445582,
                    49.8404985
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Turda Salt Mine Amusement Park",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    23.7872654,
                    46.5877459
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Furka Pass",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.4258071,
                    46.5795779
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Sölden",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    11.0076232,
                    46.9654937
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "James Bond Museum",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.9669146,
                    46.9421093
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ice Q",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.9674726000001,
                    46.9421847
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Neuschwanstein",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.7498004,
                    47.557574
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Skateline Albula",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.6132583,
                    46.6645763
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Ramolhaus",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.9696198,
                    46.8295388
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Konopiště",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.656604,
                    49.7796223
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Maroko",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -7.09262,
                    31.791702
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Pendon Museum",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -1.21757270000001,
                    51.6380692
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Modellbundesbahn",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.167543499999971,
                    51.709894
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zámek Kratochvíle",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.168269,
                    49.058488
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mauricius",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    57.552152,
                    -20.348404
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Reichsparteitagsgelände",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    11.1125338,
                    49.4323818
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Amasra",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    32.3855369,
                    41.7470209
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Bayou Corne Sinkhole",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -91.1431736,
                    30.0106069
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Geierlay Suspension Bridge",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    7.34116040000004,
                    50.0899841
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Grindelwald",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.04139620000001,
                    46.624164
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Königstein",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.0571545,
                    50.9192716
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "The Grand Garden Palace",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7628617,
                    51.0378515
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Weesenstein Castle",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8590975,
                    50.932749
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Wildgehege Moritzburg",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.6982202,
                    51.1732535
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Přehrada Fláje",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.5822161,
                    50.6869682
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Měděnec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.111586,
                    50.424417
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Klínovec",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.968055600000101,
                    50.3958333
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zámek Dobříš",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1791667,
                    49.7819444
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Großsedlitz",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8882007,
                    50.9512802
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zaandam",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    4.82919930000003,
                    52.4420399
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Campi Flegrei",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1494715,
                    40.8433641
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Miami",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -80.1917902,
                    25.7616798
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídka Slapy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4360432,
                    49.8007436
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídka Dobeška",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4136629,
                    50.0424415
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídka Nižbor",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.9995575,
                    49.9998283
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rozhledna Úvaly",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.7303406,
                    50.0777981
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jevany",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.8017816,
                    49.9691647
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hráz vodní nádrže Rozkoš",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.0637125,
                    50.3853355
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Cerhenice (bludiště)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.0620339,
                    50.0694701
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Padrťské rybníky",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.7585746,
                    49.64823
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rozhledna Blatenský vrch",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.7814167,
                    50.4002197
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vlčí jámy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.7789598,
                    50.3987767
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Přírodní rezervace Smraďoch",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.7179899,
                    50.0132852
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hranická propast",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.7506094,
                    49.5321415
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Labský důl - divoké ledovcové údolí",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.5520802,
                    50.7602278
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Moravské Toskánsko",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.0268017,
                    49.0016896
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rašeliniště na Rejvízu",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.2868331,
                    50.219688
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Jizerská oblast tmavé oblohy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.3431997,
                    50.8161803
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Komáří Vížka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8566571,
                    50.7068039
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Oasis de la Huachachina",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -75.7642211,
                    -14.0877337
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Kopec v Dolních Břežanech",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4732708,
                    49.9648825
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Komorní Hůrka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.3367151,
                    50.1007802
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Mini-Zoo Amerika",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.3320251,
                    50.1117899
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Chebský hrad",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.3663967,
                    50.0809459
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Cheb",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    12.370452,
                    50.0794657
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Lom Požáry",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3244229,
                    50.0286917
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídka Belvedér",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2215351,
                    50.8495496
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Hrad Točník",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.8872361,
                    49.890675
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Nymburk",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    15.043211,
                    50.1845131
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Soutěsky Kamenice",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.2755787,
                    50.8695489
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Tiské stěny",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.028838,
                    50.787591
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Děčínský Sněžník",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.1085787,
                    50.7931109
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Panská skála",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.484788,
                    50.7694643
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Drážďanská vyhlídka",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.098089,
                    50.7947778
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Botanická zahrada Praha",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4139142,
                    50.1220723
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Rozhledna Skulptura (Botanická zahrada Praha)",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4169109,
                    50.120668
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídka Troja",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.4219629,
                    50.119758
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zámek Jezeří",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.504915100000099,
                    50.5540214
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Vyhlídka na zámek Jezeří",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.502528,
                    50.5554238
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "Name": "Zámek Veltrusy",
                "description": null
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    14.3298447,
                    50.2775664
                ]
            }
        }
    ]
};

const format = (data: any) => {
    const formatted: IPlace[] = [];

    data.features.forEach((place: any) => {
        formatted.push({
            name: place.properties.Name,
            description: place.properties.description ? place.properties.description : '',
            coordinates: {
                longitude: place.geometry.coordinates[0],
                latitude: place.geometry.coordinates[1]
            },
            rating: {
                value: 0,
                count: 0
            },
            images: [],
            instagramPosts: [],
            accessibility: {
                walkingDistance: 0,
                difficultyCode: DifficultyCodes.DIFFICULTY_1
            },
            tags: []
        });
    });

    return formatted;
};

export default format(rawData);

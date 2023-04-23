"use client";

import { PlaceActions } from "@/actions/place";
import { Map } from "@/components/Map";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { LayoutPrimary as Layout } from "@/layouts/Primary";
import { placePrompt } from "@/prompts/place";
import { PlaceType } from "@/types/map";
import {
    Button,
    ButtonsGroup,
    Input,
    TextArea,
} from "@honzachalupa/design-system";
import { useState } from "react";

export default function CreatePlace() {
    const { user } = useSupabaseAuth();

    const [query, setQuery] = useState<string>();
    const [attemptsCount, setAttemptsCount] = useState<number>(0);
    const [mode, setMode] = useState<"ai-powered" | "manual">("ai-powered");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<{
        name: string | undefined;
        description: string | undefined;
        type: string | undefined;
        longitude: number | undefined;
        latitude: number | undefined;
        street: string | undefined;
        houseNumber: number | undefined;
        city: string | undefined;
        country: string | undefined;
        phoneNumber: string | undefined;
        emailAddress: string | undefined;
    }>({
        name: undefined,
        description: undefined,
        type: undefined,
        longitude: undefined,
        latitude: undefined,
        street: undefined,
        houseNumber: undefined,
        city: undefined,
        country: undefined,
        phoneNumber: undefined,
        emailAddress: undefined,
    });

    const setFormDataValue = <T,>(key: keyof typeof formData, value: T) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const search = () => {
        if (query) {
            setIsLoading(true);

            fetch("/api/gpt", {
                method: "POST",
                body: JSON.stringify({
                    prompt: placePrompt(query),
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    try {
                        const data = JSON.parse(
                            response.choices[0].message.content.replace(
                                /\n+/g,
                                ""
                            )
                        );

                        if (
                            !data.coordinates.longitude ||
                            !data.coordinates.latitude
                        ) {
                            throw new Error("Unable to find data.");
                        }

                        setFormData({
                            name: data.name,
                            description: data.description,
                            type: data.type,
                            longitude: data.coordinates.longitude,
                            latitude: data.coordinates.latitude,
                            street: data.address.street,
                            houseNumber: data.address.houseNumber,
                            city: data.address.city,
                            country: data.address.country,
                            phoneNumber: data.phoneNumber,
                            emailAddress: data.emailAddress,
                        });
                    } catch (error) {
                        throw new Error("Unable to parse data.");
                    }
                })
                .catch((error) => {
                    if (attemptsCount < 3) {
                        console.info(
                            error.message,
                            "Retrying...",
                            attemptsCount
                        );

                        setAttemptsCount((prevState) => prevState + 1);
                        // test();
                    } else {
                        console.info(error.message, "Failed...");
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const create = () => {
        const {
            name,
            description,
            type,
            emailAddress,
            phoneNumber,
            longitude,
            latitude,
        } = formData;

        if (name && longitude && latitude) {
            PlaceActions.create({
                name,
                description,
                type: type as unknown as PlaceType,
                coordinates: {
                    longitude,
                    latitude,
                },
                address: {
                    street: formData.street,
                    houseNumber: formData.houseNumber,
                    city: formData.city,
                    country: formData.country,
                },
                contact: {
                    emailAddress,
                    phoneNumber,
                },
                ownerId: user!.id,
            });
        }
    };

    const selectedPlace =
        formData.longitude && formData.latitude
            ? {
                  id: "",
                  name: "",
                  coordinates: {
                      longitude: formData.longitude,
                      latitude: formData.latitude,
                  },
                  ownerId: user!.id,
              }
            : null;

    return (
        <Layout>
            <Input placeholder="Search places" onChange={setQuery} />

            <ButtonsGroup className="my-3">
                <Button
                    label="Search"
                    isDisabled={!query || isLoading}
                    onClick={() => {
                        setAttemptsCount(0);
                        search();
                        setMode("ai-powered");
                    }}
                />

                <Button
                    label="Enter manualy"
                    onClick={() => {
                        setFormDataValue("name", query);
                        setMode("manual");
                    }}
                />
            </ButtonsGroup>

            {isLoading && <p>Asking AI to search for the place...</p>}

            {(formData.name || mode === "manual") && (
                <Input
                    label="Name"
                    value={formData.name}
                    isRequired
                    onChange={(value) => setFormDataValue("name", value)}
                />
            )}

            {(selectedPlace || mode === "manual") && (
                <Map
                    places={selectedPlace ? [selectedPlace] : []}
                    initialViewCoordinates={{
                        longitude: selectedPlace?.coordinates.longitude,
                        latitude: selectedPlace?.coordinates.latitude,
                    }}
                    onClick={({ longitude, latitude }) => {
                        setMode("manual");

                        setFormDataValue("longitude", longitude);
                        setFormDataValue("latitude", latitude);
                    }}
                />
            )}

            {(formData.description || mode === "manual") && (
                <TextArea
                    label="Description"
                    value={formData.description}
                    minRows={5}
                    onChange={(value) => setFormDataValue("description", value)}
                />
            )}

            {(formData.type || mode === "manual") && (
                <Input
                    label="Type"
                    value={formData.type}
                    onChange={(value) => setFormDataValue("type", value)}
                />
            )}

            {(formData.street || mode === "manual") && (
                <Input
                    label="Street"
                    value={formData.street}
                    onChange={(value) => setFormDataValue("street", value)}
                />
            )}

            {(formData.houseNumber || mode === "manual") && (
                <Input
                    label="House number"
                    value={formData.houseNumber}
                    type="number"
                    onChange={(value) => setFormDataValue("houseNumber", value)}
                />
            )}

            {(formData.city || mode === "manual") && (
                <Input
                    label="City"
                    value={formData.city}
                    onChange={(value) => setFormDataValue("city", value)}
                />
            )}

            {(formData.country || mode === "manual") && (
                <Input
                    label="Country"
                    value={formData.country}
                    onChange={(value) => setFormDataValue("country", value)}
                />
            )}

            {(formData.phoneNumber || mode === "manual") && (
                <Input
                    label="Phone number"
                    value={formData.phoneNumber}
                    onChange={(value) => setFormDataValue("phoneNumber", value)}
                />
            )}

            {(formData.emailAddress || mode === "manual") && (
                <Input
                    label="E-mail address"
                    value={formData.emailAddress}
                    onChange={(value) =>
                        setFormDataValue("emailAddress", value)
                    }
                />
            )}

            <Button
                label="Create"
                isDisabled={
                    !formData.name || !formData.latitude || !formData.longitude
                }
                onClick={create}
            />
        </Layout>
    );
}

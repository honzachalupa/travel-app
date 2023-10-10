import { GPTActions } from "@/actions/gpt";
import { Map } from "@/components/Map";
import { AppContext } from "@/contexts/App";
import { PlacesContext } from "@/contexts/Places";
import { EPlaceTypes, IPlace, TPlaceType } from "@/types/map";
import {
    Button,
    ButtonsGroup,
    Input,
    LoadingIndicator,
    Select,
    SwitchButton,
    TextArea,
    Toggle,
} from "@honzachalupa/design-system";
import moment from "moment";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

interface FormData {
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
    url: string | undefined;
    instagramUrl: string | undefined;
    isFeatured: boolean;
}

interface IProps {
    mode: "create" | "edit";
    defaultValues?: FormData;
    onSubmit: (formData: Omit<IPlace, "id">) => Promise<any>;
}

const RETRY_COUNT = 2;

export const PlaceForm: React.FC<IProps> = ({
    mode,
    defaultValues,
    onSubmit,
}) => {
    const { user, currentLocation } = useContext(AppContext);
    const { places } = useContext(PlacesContext);

    const controllerRef = useRef<AbortController>();

    const [query, setQuery] = useState<string>();
    const [attemptsQueue, setAttemptsQueue] = useState<
        {
            timestamp: string;
        }[]
    >([]);
    const [isAiModeEnabled, setIsAiModeEnabled] = useState<boolean>(true);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFailed, setIsFailed] = useState<boolean>(false);

    const initialFormData = {
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
        url: undefined,
        instagramUrl: undefined,
        isFeatured: false,
    };

    const [formData, setFormData] = useState<FormData>(
        mode === "edit" && defaultValues ? defaultValues : initialFormData
    );

    const selectedPlace = useMemo(
        () =>
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
                : null,
        [user, formData.longitude, formData.latitude]
    );

    const setFormDataValue = <T,>(key: keyof FormData, value: T) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSearch = () => {
        setIsAiModeEnabled(true);
        setFormData(initialFormData);

        setAttemptsQueue([
            {
                timestamp: moment().format(),
            },
        ]);
    };

    const search = async () => {
        if (attemptsQueue.length > 0) {
            setIsLoading(true);
            setIsFailed(false);

            controllerRef.current = new AbortController();

            await GPTActions.generateContent(query!, controllerRef.current)
                .then((data) => {
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
                        phoneNumber: data.contact.phoneNumber,
                        emailAddress: data.contact.emailAddress,
                        url: data.contact.url,
                        instagramUrl: data.contact.instagramUrl,
                        isFeatured: false,
                    });
                })
                .catch((error) => {
                    if (attemptsQueue.length < RETRY_COUNT) {
                        console.info(
                            `Search failed (${attemptsQueue.length}/${RETRY_COUNT}). Retrying...`
                        );

                        setAttemptsQueue((prevState) => [
                            ...prevState,
                            {
                                timestamp: moment().format(),
                            },
                        ]);
                    } else {
                        console.info(
                            `Search failed (${attemptsQueue.length}/${RETRY_COUNT}).`
                        );

                        setIsFailed(true);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const cancelSearch = () => {
        controllerRef.current?.abort();
    };

    const handleSubmit = () => {
        const {
            name,
            description,
            type,
            emailAddress,
            phoneNumber,
            url,
            longitude,
            latitude,
            street,
            houseNumber,
            city,
            country,
            isFeatured,
        } = formData;

        if (user && name && type && longitude && latitude) {
            setIsLoading(true);

            onSubmit({
                name,
                description,
                type: type as unknown as TPlaceType,
                coordinates: {
                    longitude,
                    latitude,
                },
                address: {
                    street,
                    houseNumber,
                    city,
                    country,
                },
                contact: {
                    emailAddress,
                    phoneNumber,
                    url,
                },
                originalQuery: query,
                ownerId: user.id,
                isFeatured,
            }).finally(() => {
                setIsLoading(false);
            });
        }
    };

    useEffect(() => {
        setIsFailed(false);
    }, [isAiModeEnabled]);

    useEffect(() => {
        search();
    }, [attemptsQueue]);

    return (
        <>
            <SwitchButton
                defaultValue="automatic"
                options={[
                    {
                        value: "automatic",
                        label: "Vytvořit s pomocí AI",
                    },
                    {
                        value: "manual",
                        label: "Vytvořit manuálně",
                    },
                ]}
                className="text-sm"
                onChange={(value) => setIsAiModeEnabled(value === "automatic")}
            />

            {isAiModeEnabled && (
                <div className="flex items-end mt-3">
                    <Input<string>
                        label="Název nebo popis místa"
                        description={`Místo můžete vyhledat pomocí názvu, popisu nebo adresy. Například "město Nin, Chorvatsko".`}
                        containerClassName="[&>p]:w-[calc(100%+85px)]"
                        onChange={(value) => {
                            setQuery(value);

                            setIsFailed(false);
                        }}
                    />

                    <Button
                        label="Hledat"
                        className="ml-1 mb-3"
                        isDisabled={!query || isLoading}
                        onClick={() => {
                            handleSearch();
                        }}
                    />
                </div>
            )}

            {isLoading && (
                <LoadingIndicator isFullscreen>
                    <p className="mb-3">
                        Hledání místa s pomocí AI - může to chvíli trvat...
                    </p>

                    <Button label="Zrušit" onClick={cancelSearch} />
                </LoadingIndicator>
            )}

            {isFailed ? (
                <p>
                    Místo se nepodařilo najít. Upřesněte prosím hledaný výraz
                    nebo místo zadejte manuálně.
                </p>
            ) : null}

            {(formData.name || !isAiModeEnabled) && (
                <Input
                    label="Název"
                    value={formData.name}
                    isRequired
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("name", value)}
                />
            )}

            {(selectedPlace || !isAiModeEnabled) && (
                <div>
                    <label className="mb-1 block">Pozice na mapě *</label>

                    <p className="text-xs opacity-50 mb-2">
                        {isAiModeEnabled
                            ? "Zkontrolujte umístění špendlíku a v případě potřeby upravte kliknutím do mapy"
                            : "Umístěte špendlík kliknutím do mapy"}
                    </p>

                    <Map
                        places={
                            selectedPlace ? [selectedPlace, ...places] : places
                        }
                        initialViewCoordinates={{
                            longitude:
                                selectedPlace?.coordinates.longitude ||
                                currentLocation.longitude,
                            latitude:
                                selectedPlace?.coordinates.latitude ||
                                currentLocation.latitude,
                        }}
                        className="w-full aspect-square rounded-sm"
                        onClick={({ longitude, latitude }) => {
                            setIsAiModeEnabled(false);

                            setFormDataValue("longitude", longitude);
                            setFormDataValue("latitude", latitude);
                        }}
                    />
                </div>
            )}

            {(formData.description || !isAiModeEnabled) && (
                <TextArea
                    label="Popis"
                    value={formData.description}
                    minRows={5}
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("description", value)}
                />
            )}

            {(formData.type || !isAiModeEnabled) && (
                <Select
                    label="Typ"
                    value={formData.type}
                    placeholder="Vyberte typ"
                    options={Object.entries(EPlaceTypes).map(
                        ([key, label]) => ({
                            value: key,
                            label,
                        })
                    )}
                    isRequired
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("type", value)}
                />
            )}

            {formData.name && (
                <Toggle
                    label="Doporučené"
                    value={formData.isFeatured}
                    onChange={(value) => setFormDataValue("isFeatured", value)}
                />
            )}

            {(formData.name || !isAiModeEnabled) && (
                <Toggle label="Zadat podrobnosti" onChange={setIsExpanded} />
            )}

            {(formData.street || isExpanded) && (
                <Input
                    label="Ulice"
                    value={formData.street}
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("street", value)}
                />
            )}

            {(formData.houseNumber || isExpanded) && (
                <Input
                    label="Číslo domu"
                    value={formData.houseNumber}
                    type="number"
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("houseNumber", value)}
                />
            )}

            {(formData.city || isExpanded) && (
                <Input
                    label="Město"
                    value={formData.city}
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("city", value)}
                />
            )}

            {(formData.country || isExpanded) && (
                <Input
                    label="Země"
                    value={formData.country}
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("country", value)}
                />
            )}

            {(formData.phoneNumber || isExpanded) && (
                <Input
                    label="Telefonní číslo"
                    value={formData.phoneNumber}
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("phoneNumber", value)}
                />
            )}

            {(formData.emailAddress || isExpanded) && (
                <Input
                    label="E-mailová adresa"
                    value={formData.emailAddress}
                    isDisabled={isLoading}
                    onChange={(value) =>
                        setFormDataValue("emailAddress", value)
                    }
                />
            )}

            {(formData.url || isExpanded) && (
                <Input
                    label="Webové stránky"
                    value={formData.url}
                    isDisabled={isLoading}
                    onChange={(value) => setFormDataValue("url", value)}
                />
            )}

            {(formData.instagramUrl || isExpanded) && (
                <Input
                    label="Instagram"
                    value={formData.instagramUrl}
                    isDisabled={isLoading}
                    onChange={(value) =>
                        setFormDataValue("instagramUrl", value)
                    }
                />
            )}

            {(formData.name || !isAiModeEnabled) && (
                <ButtonsGroup alignment="right" className="pb-5">
                    <Button
                        label={mode === "create" ? "Vytvořit" : "Uložit změny"}
                        isDisabled={
                            isLoading ||
                            !formData.name ||
                            !formData.latitude ||
                            !formData.longitude
                        }
                        onClick={handleSubmit}
                    />
                </ButtonsGroup>
            )}
        </>
    );
};

import { Place, PlaceTypes } from "@/types/map";
import { Input, Toggle } from "@honzachalupa/design-system";
import React, {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Context } from "./Context";
import { ModalSheet, ModalSheetRefProps } from "./ModalSheet";
import { PlaceDetailContent } from "./PlaceDetailContent";

interface Props {
    places: Place[];
    onPlaceSelected: (placeId: Place["id"]) => void;
    onOpen: () => void;
}

export interface PlacesListPanelRefProps {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

interface FormData {
    query: string | undefined;
    includeVisitedPlaces: boolean;
}

const Filter: React.FC<{
    onChange: (formData: FormData) => void;
}> = ({ onChange }) => {
    const [formData, setFormData] = useState<FormData>({
        query: undefined,
        includeVisitedPlaces: true,
    });

    const setFormDataValue = <T,>(key: keyof FormData, value: T) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value as any,
        }));
    };

    useEffect(() => {
        onChange(formData);
    }, [formData]);

    return (
        <div>
            <Input
                placeholder="Hledat"
                onChange={(value) => {
                    setFormDataValue("query", value);
                }}
            />

            <Toggle
                label="Zobrazit navštívená místa"
                defaultValue={formData.includeVisitedPlaces}
                onChange={(value) => {
                    setFormDataValue("includeVisitedPlaces", value);
                }}
            />
        </div>
    );
};

export const PlacesListPanel = forwardRef(
    ({ places, onPlaceSelected, onOpen }: Props, ref) => {
        const { user } = useContext(Context);

        const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(places);

        const modalSheetRef = useRef<ModalSheetRefProps>();

        const filter = ({ query, includeVisitedPlaces }: FormData) => {
            let filteredPlaces = places;

            if (query) {
                filteredPlaces = filteredPlaces.filter(
                    (place) =>
                        place.name
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        place.description
                            ?.toLowerCase()
                            .includes(query.toLowerCase()) ||
                        // @ts-ignore
                        PlaceTypes[place.type]
                            ?.toLowerCase()
                            .includes(query.toLowerCase()) ||
                        place.address?.city
                            ?.toLowerCase()
                            .includes(query.toLowerCase()) ||
                        place.address?.country
                            ?.toLowerCase()
                            .includes(query.toLowerCase())
                );
            }

            if (!includeVisitedPlaces) {
                filteredPlaces = filteredPlaces.filter(
                    (place) => !user?.visitedPlaceIds.includes(place.id)
                );
            }

            setFilteredPlaces(filteredPlaces);
        };

        useImperativeHandle(
            ref,
            (): PlacesListPanelRefProps => ({
                open: () => modalSheetRef.current?.open(),
                close: () => modalSheetRef.current?.close(),
                toggle: () => modalSheetRef.current?.toggle(),
            }),
            []
        );

        return (
            <ModalSheet
                ref={modalSheetRef}
                initialSnapPointIndex={0}
                snapPoints={[-70, 0]}
                className="md:w-[600px] md:ml-5"
                onOpen={onOpen}
            >
                <Filter onChange={filter} />

                {filteredPlaces.map((place) => (
                    <PlaceDetailContent
                        key={place.id}
                        place={place}
                        className="w-full pb-5 border-0 border-b-2 border-b-gray-500 last:border-none cursor-pointer"
                        isVisitedStatusShown
                        onClick={() => onPlaceSelected(place.id)}
                    />
                ))}
            </ModalSheet>
        );
    }
);

PlacesListPanel.displayName = "PlacesListPanel";

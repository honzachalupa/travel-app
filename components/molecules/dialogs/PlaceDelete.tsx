"use client";

import config from "@/config";
import { PlacesContext } from "@/contexts/Places";
import { useNavigation } from "@/hooks/useNavigation";
import { IPlace } from "@/types/map";
import {
    Button,
    ButtonsGroup,
    IModalRefProps,
    Modal,
} from "@honzachalupa/design-system";
import { useLogger } from "@honzachalupa/logger";
import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

interface IProps {
    placeId: IPlace["id"];
    onClose?: () => void;
}

export const PlaceDeleteDialog: React.FC<IProps> = forwardRef(
    ({ placeId, onClose }, forwardedRef) => {
        const { navigateTo } = useNavigation();
        const { log } = useLogger(config.appId);

        const { fetchPlace, deletePlace, isUserPlaceOwner } =
            useContext(PlacesContext);

        const modalRef = useRef<IModalRefProps>(null);

        const [place, setPlace] = useState<IPlace>();

        const handleDelete = () => {
            deletePlace(placeId).then(() => {
                modalRef.current?.close();
                navigateTo.home();

                log.info("Place deleted.", { id: placeId });
            });
        };

        const handleCancel = () => {
            modalRef.current?.close();
        };

        useEffect(() => {
            if (placeId) {
                fetchPlace(placeId).then(setPlace);
            }
        }, [placeId]);

        useImperativeHandle(
            forwardedRef,
            (): IModalRefProps => ({
                showModal: () => modalRef.current?.showModal(),
                close: () => modalRef.current?.close(),
            })
        );

        return (
            <Modal
                // @ts-ignore
                ref={modalRef}
                onClose={onClose}
            >
                <p className="text-center mb-5">
                    Opravdu chcete odstranit místo {place?.name}?
                </p>

                <ButtonsGroup alignment="center">
                    <Button
                        label="Ano"
                        className="bg-red-500 text-white"
                        isDisabled={place && !isUserPlaceOwner(place)}
                        onClick={handleDelete}
                    />

                    <Button
                        label="Ne"
                        isDisabled={place && !isUserPlaceOwner(place)}
                        onClick={handleCancel}
                    />
                </ButtonsGroup>
            </Modal>
        );
    }
);

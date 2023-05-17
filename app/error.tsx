"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { Button, ButtonsGroup } from "@honzachalupa/design-system";

export default function Error() {
    const { navigateTo } = useNavigation();

    return (
        <div className="w-full h-full p-5 flex flex-col items-center justify-center">
            <p className="text-center">
                Omlouváme se, došlo k neznámé chybě. Přejděte prosím na mapu a
                zkuste akci zopakovat.
            </p>

            <ButtonsGroup alignment="center" className="mt-10">
                <Button
                    label="Přejít na mapu"
                    onClick={() => navigateTo.home()}
                />
            </ButtonsGroup>
        </div>
    );
}

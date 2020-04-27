import React, { useState } from 'react';
import './style';
import Button from 'Components/Button';
import AddLocation from 'Components/Place/Create';
import LocationsList from 'Components/LocationsList';

enum Views {
    ADD_LOCATION,
    LOCATIONS_LIST
}

export default () => {
    const [view, setView] = useState<Views>(Views.LOCATIONS_LIST);

    return (
        <aside data-component="SidePanel">
            <div>
                <Button label="Místa" onClick={() => setView(Views.LOCATIONS_LIST)} />
                <Button label="Přidat místo" onClick={() => setView(Views.ADD_LOCATION)} />
            </div>

            {view === Views.LOCATIONS_LIST && (
                <LocationsList />
            )}

            {view === Views.ADD_LOCATION && (
                <AddLocation />
            )}
        </aside>
    );
};

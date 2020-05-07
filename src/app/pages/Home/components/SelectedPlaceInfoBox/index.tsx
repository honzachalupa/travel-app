import { Routes } from 'Enums/Routes';
import { IPlaceWithId } from 'Interfaces/Place';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './style';

interface IProps extends RouteComponentProps {
    place: IPlaceWithId;
    onClose: () => void;
}

export default withRouter((props: IProps) => (
    <div data-component="SelectedPlaceInfoBox">
        <button className="name" type="button" onClick={() => props.history.push(Routes.PLACE_DETAIL.replace(':id', props.place.id))}>{props.place.name}</button>
        <button className="close-button" type="button" onClick={() => props.onClose()}>Zavřít</button>
    </div>
));

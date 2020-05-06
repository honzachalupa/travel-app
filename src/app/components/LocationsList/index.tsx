import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Context } from '@honzachalupa/helpers';
import './style';
import Button from 'Components/Button';
import { Routes } from 'Enums/Routes';
import { IContext } from 'Interfaces/Context';

export default withRouter(({ history }: RouteComponentProps) => {
    const { places } = useContext(Context) as IContext;

    return (
        <div>
            {places.map(({ id, name, description }) => (
                <div key={id} className="place">
                    <p>{name}</p>
                    <p>{description}</p>

                    <Button label="Detail" onClick={() => history.push(Routes.PLACE_DETAIL.replace(':id', id))} />
                </div>
            ))}
        </div>
    );
});

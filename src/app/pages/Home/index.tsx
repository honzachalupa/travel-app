import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import { ButtonWithIcon, EColors } from 'Components/Button';
import Map from 'Components/Map';
import Navigation from 'Components/Navigation';
import { Routes } from 'Enums/Routes';
import { IContext } from 'Interfaces/Context';
import { IPlaceWithId } from 'Interfaces/Place';
import Layout from 'Layouts/Main';
import React, { useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Textfit } from 'react-textfit';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const { places } = useContext(Context) as IContext;
    const [isMapExpanded, setMapExpanded] = useState<boolean>(false);

    return (
        <Layout>
            <div data-component="Page_Home" className={cx({ 'is-scrolling-disabled': isMapExpanded })}>
                <div className={cx('my-location-map', { 'is-expanded': isMapExpanded })}>
                    <Map markers={places} onPlaceClick={(place: IPlaceWithId) => history.push(Routes.PLACE_DETAIL.replace(':id', place.id))} />

                    <ButtonWithIcon className="toggle-button" icon={isMapExpanded ? 'A' : 'V'} color={EColors.ORANGE} onClick={() => setMapExpanded(!isMapExpanded)} />
                </div>

                <div className={cx('places-list', { 'is-faded': isMapExpanded })}>
                    {places.map(place => (
                        <div key={place.id} className="place" onClick={() => history.push(Routes.PLACE_DETAIL.replace(':id', place.id))}>
                            <h3 className="name">
                                <Textfit mode="single" max={20}>
                                    {place.name}
                                </Textfit>
                            </h3>

                            <div className="details">
                                <img className="image" src={place.images[0]} />
                                <p className="description">{place.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Navigation
                    items={[{
                        label: 'Přidat',
                        icon: '+',
                        color: EColors.GREEN,
                        onClick: () => history.push(Routes.PLACE_CREATE)
                    }]}
                    singleItemAlignment="right"
                />
            </div>
        </Layout>
    );
});

import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import Button from 'Components/Button';
import { Routes } from 'Enums/Routes';
import { IContext } from 'Interfaces/Context';
import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Authentication from './components/Authentication';
import './style';

interface IProps extends RouteComponentProps {
    isExpanded: boolean;
}

export default withRouter(({ isExpanded, history }: IProps) => {
    const { isAuthenticated } = useContext(Context) as IContext;

    return (
        <nav data-component="Menu" className={cx({ 'is-expanded': isExpanded })}>
            <nav className="items">
                {isAuthenticated && (
                    <React.Fragment>
                        <p className="group-label">Administrace</p>

                        <Button className="item" label="Místa k editaci" onClick={() => history.push(Routes.ADMINISTRATION_PLACES_TO_EDIT)} />
                        <Button className="item" label="Import" onClick={() => history.push(Routes.PLACE_IMPORT)} />
                    </React.Fragment>
                )}
            </nav>

            <Authentication />
        </nav>
    );
});

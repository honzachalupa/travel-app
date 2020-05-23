import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import Button from 'Components/Button';
import { ERoles } from 'Enums/Roles';
import { Routes } from 'Enums/Routes';
import { hasRole } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Authentication from './components/Authentication';
import './style';

interface IProps extends RouteComponentProps {
    isExpanded: boolean;
}

export default withRouter(({ isExpanded, history }: IProps) => {
    const { currentUser } = useContext(Context) as IContext;

    return (
        <nav data-component="Menu" className={cx({ 'is-expanded': isExpanded })}>
            <nav className="items">
                {hasRole(currentUser, ERoles.ADMIN) && (
                    <React.Fragment>
                        <p className="group-label">Administrace</p>

                        <Button className="item" label="Místa ke schválení" onClick={() => history.push(Routes.ADMINISTRATION_PLACES_TO_EDIT)} />
                        <Button className="item" label="Import míst" onClick={() => history.push(Routes.PLACE_IMPORT)} />
                    </React.Fragment>
                )}
            </nav>

            <Authentication />
        </nav>
    );
});

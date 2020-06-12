import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
import Button from 'Components/Button';
import { ERoles } from 'Enums/Roles';
import { Routes } from 'Enums/Routes';
import { RoutesLabels } from 'Enums/RoutesLabels';
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
    // const { currentUser, isDarkModeSupported, isDarkModeOn, setIsDarkModeOn } = useContext(Context) as IContext;
    const { currentUser } = useContext(Context) as IContext;

    return (
        <nav data-component="Menu" className={cx({ 'is-expanded': isExpanded })}>
            <nav className="items">
                {hasRole(currentUser, ERoles.ADMIN) && (
                    <React.Fragment>
                        <p className="group-label">Administrace</p>

                        <Button className="item" label={RoutesLabels.ADMINISTRATION_PLACES_TO_EDIT} onClick={() => history.push(Routes.ADMINISTRATION_PLACES_TO_EDIT)} />
                        <Button className="item" label={RoutesLabels.ADMINISTRATION_PLACES_ARCHIVED} onClick={() => history.push(Routes.ADMINISTRATION_PLACES_ARCHIVED)} />
                        <Button className="item" label={RoutesLabels.PLACE_BATCH_OPERATIONS} onClick={() => history.push(Routes.PLACE_BATCH_OPERATIONS)} />
                    </React.Fragment>
                )}

                {/* !isDarkModeSupported && (
                    <div>
                        <input name="isDarkModeOn" type="checkbox" defaultChecked={isDarkModeOn} onChange={() => setIsDarkModeOn(!isDarkModeOn)} />
                        <label htmlFor="isDarkModeOn">Zapnout tmavý vzhled</label>
                    </div>
                ) */}
            </nav>

            <Authentication />
        </nav>
    );
});

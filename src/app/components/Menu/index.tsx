import { Context } from '@honzachalupa/helpers';
import cx from 'classnames';
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
    const { currentUser } = useContext(Context) as IContext;
    const isUserSigned = currentUser && currentUser.email;

    return (
        <nav data-component="Menu" className={cx({ 'is-expanded': isExpanded })}>
            {isUserSigned ? (
                <div>
                    <p>Administrace</p>

                    <ul>
                        <li>
                            <button onClick={() => history.push(Routes.ADMINISTRATION_PLACES_TO_EDIT)}>Místa k editaci</button>
                        </li>
                    </ul>
                </div>
            ) : (
                <div />
            )}

            <Authentication />
        </nav>
    );
});

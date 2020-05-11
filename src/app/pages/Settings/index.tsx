import { Context } from '@honzachalupa/helpers';
import Button, { EColors } from 'Components/Button';
import { Routes } from 'Enums/Routes';
import { Authentication } from 'Helpers';
import { IContext } from 'Interfaces/Context';
import Layout from 'Layouts/Main';
import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {
    const { currentUser } = useContext(Context) as IContext;
    const isUserSigned = currentUser && currentUser.email;

    return (
        <Layout>
            <div data-component="Page_Settings">
                <h1 className="headline">Nastavení</h1>

                {isUserSigned ? (
                    <React.Fragment>
                        <p>{currentUser.email}</p>

                        <Button label="Odhlásit se" color={EColors.RED} onClick={() => Authentication.signOut()} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Button label="Přihlásit se" color={EColors.GREEN} onClick={() => history.push(Routes.SIGN_IN)} />
                        <Button label="Registrovat se" onClick={() => history.push(Routes.SIGN_UP)} />
                    </React.Fragment>
                )}
            </div>
        </Layout>
    );
});

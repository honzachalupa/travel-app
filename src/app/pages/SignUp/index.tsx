import UserActions from 'Actions/users';
import Button from 'Components/Button';
import { Routes } from 'Enums/Routes';
import { RoutesLabels } from 'Enums/RoutesLabels';
import { Authentication } from 'Helpers';
import Layout from 'Layouts/WithSpacing';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({ history }) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleSignUp = () => {
        if (password === passwordRepeat) {
            Authentication.createUserWithEmailAndPassword(emailAddress, password).then((e) => {
                if (e.user) {
                    UserActions.set(e.user.uid, emailAddress);
                }

                history.push(Routes.ROOT);
            }).catch(error => {
                alert(error);
            });
        } else {
            alert('Zadaná hesla se neshodují.');
        }
    };

    return (
        <Layout title={RoutesLabels.SIGN_UP}>
            <form className="form" data-component="SignUpForm">
                <input type="text" placeholder="E-mailová adresa" onChange={e => setEmailAddress(e.target.value)} />
                <input type="password" placeholder="Heslo" onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Heslo (kontrola)" onChange={e => setPasswordRepeat(e.target.value)} />

                <Button className="yellow" label="Registrovat" onClick={handleSignUp} />
            </form>
        </Layout>
    );
});

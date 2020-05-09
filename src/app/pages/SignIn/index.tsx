import Button from 'Components/Button';
import { Routes } from 'Enums/Routes';
import { Authentication } from 'Helpers';
import Layout from 'Layouts/Main';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({ history }) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        Authentication.signInWithEmailAndPassword(emailAddress, password).then(() => {
            history.push(Routes.ROOT);
        }).catch(error => {
            alert(error);
        });
    };

    return (
        <Layout>
            <h1>Sign In</h1>

            <form className="form" data-component="SignInForm">
                <input type="text" placeholder="E-mail Address" onChange={e => setEmailAddress(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <Button className="yellow" label="Sign In" onClick={handleSignIn} />
            </form>
        </Layout>
    );
});

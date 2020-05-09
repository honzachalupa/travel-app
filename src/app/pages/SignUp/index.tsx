import Button from 'Components/Button';
import { Routes } from 'Enums/Routes';
import { Authentication } from 'Helpers';
import Layout from 'Layouts/Main';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({ history }) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleSignUp = () => {
        if (password === passwordRepeat) {
            Authentication.createUserWithEmailAndPassword(emailAddress, password).then(() => {
                history.push(Routes.ROOT);
            }).catch(error => {
                alert(error);
            });
        } else {
            alert('Zadaná hesla se neshodují.');
        }
    };

    return (
        <Layout>
            <h1>Sign Up</h1>

            <form className="form" data-component="SignUpForm">
                <input type="text" placeholder="E-mail Address" onChange={e => setEmailAddress(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Password (repeat)" onChange={e => setPasswordRepeat(e.target.value)} />

                <Button className="yellow" label="Sign Up" onClick={handleSignUp} />
            </form>
        </Layout>
    );
});

import Layout from 'Layouts/Main';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './style';

export default withRouter(({ history }: RouteComponentProps) => {


    return (
        <Layout>
            <div data-component="Page_Settings">

            </div>
        </Layout>
    );
});

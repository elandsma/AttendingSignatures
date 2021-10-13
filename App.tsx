import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import AuthenticationLandingPage from './components/AuthenticationLandingPage';
import './custom.css'
import AttendingSignatures from './components/AttendingSignatures';
import { Handle401, Handle403, Handle404 } from './components/AxiosResponseErrorInterceptionHandlers';
import DemoLandingPage from './components/DemoLandingPage';

export default () => (

    <Layout>
        <Switch>
            <Route exact path='/AttendingSignatures' component={AttendingSignatures} />
            <Route exact path='/a/:sessionid/:authtoken' component={AuthenticationLandingPage} />
            <Route exact path='/401' component={Handle401} />
            <Route exact path='/403' component={Handle403} />
            <Route exact path='/404' component={Handle404} />
            <Route exact path='/demo' component={DemoLandingPage} />
            <Route path='/' component={AuthenticationLandingPage} />  {/* default & catch all */}
        </Switch>
    </Layout>
);

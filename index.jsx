import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

axios.interceptors.response.use(function (response) {
    console.log("axios got a response code in the 200s");
    return response;
}, function (error) {
    console.log("axios got a reponse code outside of the 200s: "+error.response.status);
    switch (error.response.status) {
        case 401:
            history.push('/401');
            break;
        case 403:
            history.push('/403');
            break;
        case 404:
            history.push('/404');
            break;
    }
    return Promise.reject(error);
});


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

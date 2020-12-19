import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App';
import 'regenerator-runtime/runtime';
import './style.css';
import { ClientId, domain } from '../../config';

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={ClientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app'),
);

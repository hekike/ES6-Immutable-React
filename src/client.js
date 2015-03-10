import Debug from 'debug';
import App from './app';
import _ from 'lodash';

var debug = Debug('app');
var attachElement = document.getElementById('app');

var state = {
  path: null
};

var windowState;
var app;

// TODO: remove in production
Debug.enable('*');

// load state from the server sent state
// needed for isomorphic state sharing
if(window.state) {
  try {
    windowState = JSON.parse(window.state);

    debug('state will be loaded from window', windowState);

    // Default with client state
    state = _.defaults(state, windowState);
  } catch (err) {
    debug('JSON window.state parse', err);
  }
}

// Create new app and attach to element
app = new App(state);
app.renderToDOM(attachElement);

// Try to add more
// <div id="app2"></div> have to be presented in the DOM
// new App(document.getElementById('app2'));
// new App(document.getElementById('app3'));

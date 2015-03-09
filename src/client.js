import App from './app';

var state;

// load state from the server sent state
// needed for isomorphic state sharing
if(window.state) {
  try {
    state = JSON.parse(window.state);
  } catch (err) {
    console.error(err);
  }
}

new App(state, document.getElementById('app'));

// Try to add more
// <div id="app2"></div> have to be presented in the DOM
// new App(document.getElementById('app2'));
// new App(document.getElementById('app3'));

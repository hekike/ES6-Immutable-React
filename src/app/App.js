import React from 'react/addons';
import {Dispatcher} from 'flux';
import Debug from 'debug';

import AppComponent from './components/app';
import Store from './Store';
import Actions from './Actions';

var debug = Debug('app');

/*
 * @class App
 */
class App {

  /*
   * @constructs App
   * @param {Object} state
   * @param {DOM} element
   */
  constructor(state) {
    var dispatcher = new Dispatcher();

    this.actions = new Actions(dispatcher);
    this.store = new Store(dispatcher, state);
  }

  /*
   * @method init
   */
  init() {
    return Promise.all([
      // TODO: fetch initial data, server should wait
      // _this.actions.usersGet()
    ]);
  }

  /*
   * @method render
   * @param {DOM} [element]
   * @returns {String|undefined}
   */
  render (element) {

    // would be in JSX: <AppRoot actions={this.actions} store={this.store} />
    var appRootElement = React.createElement(AppComponent, {
      actions: this.actions,
      store: this.store
    });

    // render to DOM
    if(element) {
      React.render(appRootElement, element);
      return;
    }

    // render to string
    return React.renderToString(appRootElement);
  }

  /*
   * @method render
   * @param {DOM} element
   */
  renderToDOM (element) {
    if(!element) {
      return debug(new Error('App.renderToDOM: element is required'));
    }

    this.render(element);
  }

  /*
   * @method renderToString
   * @returns {String}
   */
  renderToString () {
    return this.render();
  }

  /*
   * @method getState
   * @returns {Immutable.map}
   */
  getState () {
    return this.store.state;
  }

}

export default App;

import React from 'react/addons';
import {Dispatcher} from 'flux';

import AppComponent from './components/app';
import Store from './Store';
import Actions from './Actions';

class App {
  constructor(state, element) {
    var dispatcher = new Dispatcher();

    var actions = new Actions(dispatcher);
    this.store = new Store(dispatcher, state);

    this.context = {
      actions: actions,
      store: this.store
    };

    if(element) {
      React.render(<AppComponent context={this.context} />, element);
    }
  }

  renderToString() {
    return React.renderToString(<AppComponent context={this.context} />);
  }

  getState() {
    return this.store.state.toJS();
  }
}

export default App;

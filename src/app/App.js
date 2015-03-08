import React from 'react/addons';
import {Dispatcher} from 'flux';

import AppComponent from './components/app';
import Store from './Store';
import Actions from './Actions';

class App {
  constructor(element) {
    var dispatcher = new Dispatcher();

    var actions = new Actions(dispatcher);
    var store = new Store(dispatcher);

    var context = {
      actions: actions,
      store: store
    };

    React.render(<AppComponent context={context} />, element);
  }
}

export default App;

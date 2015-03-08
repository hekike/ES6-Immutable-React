import React from 'react';
import Component from './Component';

import UserList from './UserList';
import {CHANGE} from '../const';

class App extends React.Component {
  constructor(props) {
    super(props);

    var state = this.props.context.store.getState();

    this.state = {
      userList: state.get('userList')
    };
  }

  shouldComponentUpdate() {
   return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  getChildContext() {
    return this.props.context;
  }

  componentDidMount () {
    var _this = this;
    var store = _this.getChildContext().store;

    store.on(CHANGE, function () {
      var state = store.getState();

      _this.setState({
        userList: state.get('userList')
      });
    });
  }

  render() {
    return <UserList name={this.state.userList.get('name')} users={this.state.userList.get('users')} />;
  }
}

App.childContextTypes = Component.contextTypes;

export default App;

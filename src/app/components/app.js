import React from 'react';
import Store from '../Store';
import Component from './Component';

import UserList from './UserList';
import {CHANGE} from '../const';

/*
 * @class App
 * @extends React.Component
 */
class App extends React.Component {

  /*
   * @constructs App
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    // Set initial state
    var state = this.props.context.store.getState();
    this.state = {
      userList: state.get('userList')
    };
  }

  /*
   * Apply PureRenderMixin
   *
   * in React 0.13 there is no way to attach mixins to ES6 classes
   * this is a workaround to solve this
   * http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#mixins
   *
   * @method shouldComponentUpdate
   * @returns {Boolean}
   */
  shouldComponentUpdate() {
   return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  /*
   * @method getChildContext
   * @returns {Object} childContext
   */
  getChildContext() {

    // share only actions with childs
    return {
      actions: this.props.context.actions
    };
  }

  /*
   * @method componentDidMount
   */
  componentDidMount () {
    var _this = this;
    var store = _this.props.context.store;

    // Set new state for store's change event -> re-render component tree
    store.on(CHANGE, function () {
      var state = store.getState();

      _this.setState({
        userList: state.get('userList')
      });
    });
  }

  /*
   * @method render
   * @returns {JSX}
   */
  render() {
    return <UserList name={this.state.userList.get('name')} users={this.state.userList.get('users')} />;
  }
}

// Context types validation
App.childContextTypes = Component.contextTypes;

// Prop types validation
App.propTypes = {
  context: React.PropTypes.shape({
    actions: React.PropTypes.object.isRequired,
    store: React.PropTypes.instanceOf(Store).isRequired
  })
};

export default App;

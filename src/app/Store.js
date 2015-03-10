import {EventEmitter} from 'events';
import {Map, List} from 'immutable';
import _ from 'lodash';
import Debug from 'debug';

import User from './models/User';
import {ADD_USER, CHANGE} from './const';

var debug = Debug('app');

/*
 * @class Store
 */
class Store extends EventEmitter {

  /*
   * @constructs Store
   * @param {Object} dispatcher
   * @param {Object} [state]
   */
  constructor(dispatcher, state) {
    var _this = this;

    if(!dispatcher) {
      debug(new Error('Store: dispatcher is required'));
    }

    if(state) {
      debug('app is created with initial state', state);
    }

    // Load state from default
    state = state || {};
    state = _.defaults(state, Store.defaultState);

    // Register handlers
    dispatcher.register(function (action) {
      if(action.actionType === ADD_USER) {
        _this.onAddUser(action);
        _this.emit(CHANGE);
      }
    });

    debug('store is loaded with state', state);

    // Turn state to immutable
    _this.state = Map({
      path: state.path,
      userList: Map({
        name: state.userList.name,
        users: List(state.userList.users.map(user => new User(user)))
      })
    });
  }

  /*
   * Add user
   *
   * @method onAddUser
   * @param {Object} user
   */
  onAddUser(action) {
    var user = new User({
      first: action.firstName,
      last: action.lastName
    });

    this.state = this.state.updateIn(['userList', 'users'], list => list.push(user));
  }

  /*
   * Get state
   *
   * @method getState
   * @returns {Map} state
   */
  getState() {
    return this.state;
  }
}

// Default state
Store.defaultState = {
  path: null,
  userList: {
    name: 'Employees',
    users: []
  }
};

export default Store;

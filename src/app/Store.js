import {EventEmitter} from 'events';
import {Map, List} from 'immutable';

import User from './models/User';
import {ADD_USER, CHANGE} from './const';

class Store extends EventEmitter {
  constructor(dispatcher, initialState) {
    var _this = this;
    const state = initialState || Store.defaultState;

    dispatcher.register(function(action) {
      if(action.actionType === ADD_USER) {
        _this.onAddUser(action);
        _this.emit(CHANGE);
      }
    });

    this.state = Map({
      userList: Map({
        name: state.userList.name,
        users: List(state.userList.users.map(user => new User(user)))
      })
    });
  }

  onAddUser(action) {
    var user = new User({
      first: action.firstName,
      last: action.lastName
    });

    this.state = this.state.updateIn(['userList', 'users'], list => list.push(user));
  }

  getState() {
    return this.state;
  }
}

Store.defaultState = {
  userList: {
    name: 'Employees',
    users: []
  }
};

export default Store;

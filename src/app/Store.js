import {EventEmitter} from 'events';
import {Map, List} from 'immutable';

import User from './models/User';
import {ADD_USER, CHANGE} from './const';

class Store extends EventEmitter {
  constructor(dispatcher) {
    var _this = this;

    dispatcher.register(function(action) {
      if(action.actionType === ADD_USER) {
        _this.onAddUser(action);
        _this.emit(CHANGE);
      }
    });

    this.state = Map({
      userList: Map({
        name: 'Employees',
        users: List.of(
          new User({ first: 'Such', last: 'Lajcsi' }),
          new User({ first: 'Much', last: 'Marcsi' }),
          new User({ first: 'So', last: 'Lujza' })
        )
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

export default Store;

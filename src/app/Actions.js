import {ADD_USER} from './const';

class Actions {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  addUser (user) {
    this.dispatcher.dispatch({
     actionType: ADD_USER,
     firstName: user.firstName,
     lastName: user.lastName
   });
  }
}

export default Actions;

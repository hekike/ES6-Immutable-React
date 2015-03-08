import {Record} from 'immutable';

class User extends Record({ first: 'first', last: 'last' }) {
  getName() {
    return this.first + ' ' + this.last;
  }
}

export default User;

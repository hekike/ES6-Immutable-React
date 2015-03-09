import React from 'react';
import {List} from 'immutable';

import Component from './Component';
import Item from './Item';

/*
 * @class UserList
 * @extends Component
 */
class UserList extends Component {

  /*
   * @constructs UserList
   */
  constructor () {

    // User add counter
    this.counter = 0;
  }

  /*
   * @method render
   * @returns {JSX}
   */
  render() {
    return <div>
      <h2>{this.props.name}</h2>

      <button onClick={this.onAddUserClick.bind(this)}>Add new user</button>

      <ul>
        {this.props.users.map((user, i) => {
          return <Item key={i} item={user} />;
        }).toArray()}
      </ul>
    </div>;
  }

  /*
   * On add user click
   * add new user to the users
   *
   * @method onAddUserClick
   */
   onAddUserClick () {
    this.counter++;

    this.context.actions.addUser({
      firstName: 'John ' + this.counter,
      lastName: 'Smith'
    });
  }
}

// Validate props
UserList.propTypes = {
  users: React.PropTypes.instanceOf(List).isRequired
};

export default UserList;

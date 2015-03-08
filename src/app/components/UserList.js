import React from 'react';
import Component from './Component';
import Item from './Item';

class UserList extends Component {
  constructor () {
    this.counter = 0;
  }

  render() {
    return <div>
      <h2>{this.props.name}</h2>

      <button onClick={this.onAddItemClick.bind(this)}>Add new user</button>

      <ul>
        {this.props.users.map((user, i) => {
          return <Item key={i} item={user} />;
        }).toArray()}
      </ul>
    </div>;
  }

  onAddItemClick () {
    this.counter++;

    this.context.actions.addUser({
      firstName: 'John ' + this.counter,
      lastName: 'Smith'
    });
  }
}

export default UserList;

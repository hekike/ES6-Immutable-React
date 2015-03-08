import React from 'react';
import Component from './Component';

class Item extends Component {
  render() {    
    return <li>{this.props.item.getName()}</li>;
  }
}

export default Item;

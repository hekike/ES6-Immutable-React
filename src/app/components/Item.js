import React from 'react';
import {Record} from 'immutable';

import Component from './Component';

/*
 * @class Item
 * @extends Component
 */
class Item extends Component {

  /*
   * @method render
   * @returns {JSX}
   */
  render() {
    return <li>{this.props.item.getName()}</li>;
  }
}

// Validate props
// checking for Record instance of User because re-useability
Item.propTypes = {
  item: React.PropTypes.instanceOf(Record).isRequired
};

export default Item;

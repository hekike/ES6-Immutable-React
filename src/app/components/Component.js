import React from 'react';

class Component extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
   return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }
}

Component.contextTypes = {
  actions: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

export default Component;

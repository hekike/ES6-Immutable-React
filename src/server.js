import path from 'path';

import Express from 'express';
import React from 'react';
import _ from 'lodash';

import ClientApp from './app';
import Layout from './Layout.jsx';

const app = Express();

var initialState = {
  userList: {
    name: 'Employees',
    users: [
      { first: 'Such', last: 'Lajcsi' },
      { first: 'Much', last: 'Marcsi' },
      { first: 'So', last: 'Lujza' }
    ]
  }
};

app.set('port', process.env.PORT || 3000);
app.use('/dist', Express.static(path.resolve(__dirname, '../dist')));

app.get('*', (req, res, next) => {
  const state = _.defaults({
    path: req.url
  }, initialState);

  // create app
  const clientApp = new ClientApp(state);

  // init app
  clientApp
    .init()
    .then(function () {

      // get app's state
      const clientAppState = clientApp.getState().toJS();

      // render app to html and stringify state
      const clientHtml = clientApp.renderToString();
      const clientState = 'window.state = \'' + JSON.stringify(clientAppState) + '\';';

      // render to layout
      const html = React.renderToStaticMarkup(<Layout
        title='ES6 React'
        appHtml={clientHtml}
        appState={clientState} />);

      res.send(html);
    })
    .catch(next);
});

app.listen(app.get('port'), ()=> {
  console.log('app listening on', app.get('port'));
});

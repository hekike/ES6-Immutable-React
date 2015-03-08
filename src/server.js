import fs from 'fs';
import path from 'path';

import Express from 'express';
import React from 'react';

import ClientApp from './app';
import Layout from './Layout.jsx';

const app = Express();
const clientAppScript = fs.readFileSync(path.resolve(__dirname, '../dist/bundle.js'));

const initialState = {
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

app.get('*', (req, res) => {

  // create app and get state
  const clientApp = new ClientApp(initialState);
  const clientAppState = clientApp.getState();

  // render app to html and stringify state
  const clientHtml = clientApp.renderToString();
  const clientState = 'window.state = \'' + JSON.stringify(clientAppState) + '\';';

  // render to layout
  const html = React.renderToStaticMarkup(<Layout
    title='ES6 React'
    appHtml={clientHtml}
    appScript={clientAppScript}
    appState={clientState} />);

  res.send(html);
});

app.listen(app.get('port'), ()=> {
  console.log('app listening on', app.get('port'));
});

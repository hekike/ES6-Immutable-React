import fs from 'fs';
import path from 'path';

import Express from 'express';
import React from 'react';

import App from './app';
import Layout from './Layout.jsx';

const app = Express();
const clientScript = fs.readFileSync(path.resolve(__dirname, '../dist/bundle.js'));

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
  const clientApp = new App(initialState);
  const clientState = clientApp.getState();

  const appHtml = clientApp.renderToString();
  const appState = 'window.state = \'' + JSON.stringify(clientState) + '\';';
  const html = React.renderToStaticMarkup(<Layout title='ES6 React' appHtml={appHtml} script={clientScript} state={appState} />);

  res.send(html);
});

app.listen(app.get('port'), ()=> {
  console.log('app listening on', app.get('port'));
});

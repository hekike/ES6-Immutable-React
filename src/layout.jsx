import React from 'react';

export default React.createClass({
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.appHtml}}></div>

          <script dangerouslySetInnerHTML={{__html: this.props.appState}} />
          <script dangerouslySetInnerHTML={{__html: this.props.appScript}} />
        </body>
      </html>
    );
  }
});

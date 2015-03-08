# ES6 Immutable React and Isomorphic

- React 0.13 in ES6 syntax with Immutable.js and pure FB Flux  
- Multiple instances from the app can be created.  
- Isomorphic app. (server and client side render as well)

## How to run

### As Isomorphic app

`npm install` will build the bundled client code in `postinstall`  
`npm start`

### Only client side

`npm install`  
`npm run build` or `npm run watch`  

Server dist with `node-static` or similar:  

```
npm install -g node-static
static dist
```

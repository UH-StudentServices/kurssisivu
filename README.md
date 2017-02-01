# Course App

## Development

### Install dependencies

To install the dependecies run:

```
npm install
```

### Run Webpack

Webpack entry file is `src/index.jsx`. The `src` folder has all JavaScript source files. SASS files are in the `src/styles` folder. To run webpack run:

```
npm run-script dev
```

Webpack will output a `app.js` and `app.css` files inside the `dist` folder. Running the above command will also launch webpack dev server at port `8080`.

### Open Browser

And navigate to [http://localhost:8080](http://localhost:8080).
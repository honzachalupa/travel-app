## Overview
Webpack-powered dev-stack using newest technologies. Great for both web and PWA apps.

## Features
- Babel
- webpack-dev-server
- React
- React Router
- Service Worker with caching prepared
- SCSS (with autoprefixer)
- ESlint (Airbnb + Flowtype)
- Stylelint
- config file for IIS servers (redirect rule)
- common helper functions

## Used plugins
 - [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
 - [webapp-webpack-plugin](https://www.npmjs.com/package/webapp-webpack-plugin)
 - [stylelint-webpack-plugin](https://www.npmjs.com/package/stylelint-webpack-plugin)
 - [copy-webpack-plugin](https://www.npmjs.com/package/copy-webpack-plugin)
 - [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

## Getting started
Step 1: Install dependencies using `npm install`.
Step 2: Run webpack-dev-server using `npm run dev` (running app should be accessible on `localhost:8080` by default).
Step 3 (optional): Run build script using `npm run build`. Builded files will be in `/dist` folder.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

# my-stop

This is a simple, mobile friendly, webapp that display the upcoming departures of a specific station in Berlin.

The information is obtained from [https://v6.bvg.transport.rest/](https://v6.bvg.transport.rest/), which is a wrapper of a BVG API.

The app is currently deployed [here](https://my-stop.netlify.app/). You can search for a stop by adding it to the location hash. For example: `https://my-stop.netlify.app/#ostkreuz`.

<img alt="Hauptbahnhof" src="./screenshot.png" width="400"/>

There is an alternative style called 'blue' that you can use by adding "style=blue" to the query string. For example: `https://my-stop.netlify.app/?style=blue#ostkreuz`.

<img alt="Hauptbahnhof in blue" src="./screenshot-blue.png" width="400"/>

## Getting Started

First, run the development server:

```bash
npm start
```

This will start a development server at http://localhost:1234.

To run the production build:

```bash
npm run build
```

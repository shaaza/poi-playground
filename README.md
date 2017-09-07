# POI Playground

UI tool to compare search results from different Places Search APIs, and visualize them on a map.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Build
For the project to build, these files must exist with exact filenames:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

### `npm run build`

Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. 


## Dev

To run the dev server, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Runs tests.


## Supported APIs
* [Google Places Autocomplete](https://developers.google.com/places/web-service/autocomplete)* with [Place Details](https://developers.google.com/places/web-service/details)
* [Foursquare Venues Suggest Completion](https://developer.foursquare.com/docs/venues/venues)
* [Foursquare Venues Search](https://developer.foursquare.com/docs/venues/venues)
* [Google Text Search](https://developers.google.com/places/web-service/search#TextSearchRequests)
* [Google Nearby Search](https://developers.google.com/places/web-service/search#PlaceSearchRequests)
* [Google Reverse Geocoding](https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding)


*Note: Google Places APIs are implemented using the JavaScript API Client due to lack of CORS support using the Web APIs.
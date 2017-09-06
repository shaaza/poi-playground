import { getOrCreateDummyMapDOMElement } from './util'
import googleMapLoader from './map_loader'
// import googleMapLoader from 'google-map-react';

var AUTOCOMPLETE_SERVICE = null;
var PLACES_SERVICE = null;

if (AUTOCOMPLETE_SERVICE === null && PLACES_SERVICE === null) {
        let gmapsKey = window.localStorage.getItem("gmapsKey");
        googleMapLoader({key: gmapsKey})
        .then((maps) => {
            AUTOCOMPLETE_SERVICE = new maps.places.AutocompleteService();
            PLACES_SERVICE = new maps.places.PlacesService(getOrCreateDummyMapDOMElement('dummyGoogleMap'));
        })
}

function fetchGoogleTextSearchResults({ baseUrl, latLng, query, radius, limit, keyParams }, receiverFunc) {
    if (PLACES_SERVICE === null) {
        alert("Google maps not loaded!")
        return;
    }
    let [lat, lng] = latLng.split(',')
    function getResultsAndCallReceiver(results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) { 
            receiverFunc([]);
            return;
        }

        if (status !== window.google.maps.places.PlacesServiceStatus.OK) { 
            console.log("Google Maps Returned: " + status + " for Text Search")
            return;
        }

        let locations = results.slice(0, limit).map((result) => ({
            name: result['name'],
            address: result['formatted_address'],
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng()
        }
        ));

        receiverFunc(locations);

    };
    
    let queryParams = { query: query, language: "id" }
    if (lat.length !== 0 && lng.length !== 0 && radius.length !== 0) {
        queryParams.location = new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng));
        queryParams.radius = parseInt(radius, 10);
    }
        PLACES_SERVICE.textSearch(queryParams, getResultsAndCallReceiver);
}


export default fetchGoogleTextSearchResults;

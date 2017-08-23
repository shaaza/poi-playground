import getOrCreateDummyMapDOMElement from './util'
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

function fetchGoogleResults({ baseUrl, latLng, query, radius, limit, keyParams }, receiverFunc) {
    if (AUTOCOMPLETE_SERVICE === null || PLACES_SERVICE === null) {
        alert("Google maps not loaded!")
        return;
    }
    let [lat, lng] = latLng.split(',')
    function getDetailsAndCallReceiver(predictions, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) { 
            console.log("Google Maps Returned: " + status + " for Autocomplete")
            return;
        }

        let suggestions = {};
        let orderedSuggestionsByPlaceID = predictions.map((p) => (p['place_id']))

        predictions.forEach((prediction) => {
            suggestions[prediction['place_id']] = {
                name: prediction['structured_formatting']['main_text'],
                address: prediction['structured_formatting']['secondary_text'],
            }
        });
        let successCounterForPlaceDetails = 0

        function checkIfAllSuccessAndCallReceiver() {
            successCounterForPlaceDetails += 1;
            if (successCounterForPlaceDetails === Object.keys(suggestions).length) {
                let locations = orderedSuggestionsByPlaceID.map((placeId) => suggestions[placeId]);
                receiverFunc(locations);
            }
        }

        function getAndPopulateLatLngFor(placeId, isLastResult) {
            return function(details, status) {
                if (status === "OK") {
                    if (details !== null) {
                        suggestions[placeId]['lat'] = details.geometry.location.lat();
                        suggestions[placeId]['lng'] = details.geometry.location.lng();
                        suggestions[placeId]['address'] = details.formatted_address;
                    }
                } else {
                    console.log("Google Maps Returned: " + status + " for Place Details")
                }
                checkIfAllSuccessAndCallReceiver();
            }
        }

        let noOfResults = Object.keys(suggestions).length;
        Object.keys(suggestions)
              .forEach((placeId, index) => { 
                  let isLastResult = (noOfResults === index + 1);
                  PLACES_SERVICE.getDetails({ placeId }, getAndPopulateLatLngFor(placeId, isLastResult));
                });

    };
    
    let queryParams = { input: query }
    if (lat.length !== 0 && lng.length !== 0 && radius.length !== 0) {
        queryParams.location = new window.google.maps.LatLng(parseInt(lat, 10), parseInt(lng, 10));
        queryParams.radius = parseInt(radius, 10);
    }
    if (limit.length !== 0) {
        queryParams.limit = parseInt(limit, 10)
    }
        AUTOCOMPLETE_SERVICE.getPlacePredictions(queryParams, getDetailsAndCallReceiver);
}


export default fetchGoogleResults;

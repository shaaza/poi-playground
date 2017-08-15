import getOrCreateDummyMapDOMElement from './util'

var acService = new window.google.maps.places.AutocompleteService();
var placesService = new window.google.maps.places.PlacesService(getOrCreateDummyMapDOMElement('dummyGoogleMap'));


function fetchGoogleResults({ baseUrl, latLng, query }, receiverFunc) {
    let [lat, lng] = latLng.split(',')
    function getDetailsAndCallReceiver(predictions, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) { 
            console.log("Google Maps Returned: " + status)
            return;
        }

        let suggestions = {}
        let orderedSuggestionsByPlaceID = predictions.map((p) => (p['place_id']))

        predictions.forEach((prediction) => {
            suggestions[prediction['place_id']] = {
                name: prediction['structured_formatting']['main_text'],
                address: prediction['structured_formatting']['secondary_text'],
            }
        });

        function getAndPopulateLatLngFor(placeId) {
            return function(details, status) {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    if (details !== null) {
                        suggestions[placeId]['lat'] = details.geometry.location.lat();
                        suggestions[placeId]['lng'] = details.geometry.location.lng();
                    }
                } else {
                    console.log("Google Maps Returned: " + status)
                }
            }
        }

        Object.keys(suggestions)
              .forEach((placeId) => { placesService.getDetails({ placeId }, getAndPopulateLatLngFor(placeId))})

        let locations = orderedSuggestionsByPlaceID.map((placeId) => suggestions[placeId])
        receiverFunc(locations)
    };
    
    acService.getPlacePredictions({ input: query, location: new window.google.maps.LatLng(lat, lng), radius: 100000 }, getDetailsAndCallReceiver);
}


export default fetchGoogleResults;

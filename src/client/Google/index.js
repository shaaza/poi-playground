import getParameterByName from '../../util/parseQueryParams'
import getOrCreateDummyMapDOMElement from './util'

var acService = new window.google.maps.places.AutocompleteService();
var placesService = new window.google.maps.places.PlacesService(getOrCreateDummyMapDOMElement('dummyGoogleMap'));


function fetchGoogleResults({ baseUrl }, receiverFunc) {
    let url = baseUrl;
    function getDetailsAndCallReceiver(predictions, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) { 
            alert(status); 
            return;
        }

        let suggestions = {}
        let orderedSuggestionsByPlaceID = predictions.map((p) => (p['place_id']))

        predictions.map((prediction) => {
            suggestions[prediction['place_id']] = {
                name: prediction['structured_formatting']['main_text'],
                address: prediction['structured_formatting']['secondary_text'],
            }
        });

        function getAndPopulateLatLngFor(placeId) {
            return function(details, status) {
                suggestions[placeId]['lat'] = details.geometry.location.lat();
                suggestions[placeId]['lng'] = details.geometry.location.lng();
            }
        }

        Object.keys(suggestions)
              .map((placeId) => { placesService.getDetails({ placeId }, getAndPopulateLatLngFor(placeId))})

        let locations = orderedSuggestionsByPlaceID.map((placeId) => suggestions[placeId])
        receiverFunc(locations)
    };
    
    acService.getPlacePredictions({ input: getParameterByName('input', url) }, getDetailsAndCallReceiver);
}


export default fetchGoogleResults;

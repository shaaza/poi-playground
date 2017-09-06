// import { parseQueryParams } from './util'
import googleMapLoader from './map_loader'

var GEOCODER_SERVICE = null;

if (GEOCODER_SERVICE === null) {
        let gmapsKey = window.localStorage.getItem("gmapsKey");
        googleMapLoader({key: gmapsKey})
        .then((maps) => {
            GEOCODER_SERVICE = new maps.Geocoder();
        })
}

function fetchGoogleReverseGeocodeResults({ baseUrl, query, limit }, receiverFunc) {
    if (GEOCODER_SERVICE === null) {
        alert("Google maps not loaded!")
        return;
    }
    let [lat, lng] = query.split(',')
    // let urlQueryParams = parseQueryParams(baseUrl);

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
    

    let queryParams = {}

    if (lat.length === 0 || lng.length === 0) {
        alert("No lat-long provided.")
        return
    }

    queryParams.location = new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    GEOCODER_SERVICE.geocode(queryParams, getResultsAndCallReceiver);
}


export default fetchGoogleReverseGeocodeResults;

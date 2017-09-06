import { getOrCreateDummyMapDOMElement, parseQueryParams } from './util'
import googleMapLoader from './map_loader'

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

function fetchGoogleNearbySearchResults({ baseUrl, latLng, query, radius, limit, keyParams }, receiverFunc) {
    if (PLACES_SERVICE === null) {
        alert("Google maps not loaded!")
        return;
    }
    let [lat, lng] = query.split(',')
    let urlQueryParams = parseQueryParams(baseUrl);

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
            address: "",
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng()
        }
        ));

        receiverFunc(locations);

    };
    

    let queryParams = { language: "id" }

    if (lat.length === 0 || lng.length === 0) {
        alert("No lat-long provided.")
        return
    }
    
    queryParams.location = new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    if (!urlQueryParams.rankBy || radius === "") {
        alert("Either rankBy param or radius param must be provided.")
        return
    }

    if (urlQueryParams.rankBy && !(urlQueryParams === "DISTANCE" || "PROMINENCE")) {
        alert("Invalid value for rankBy")
        return
    }

    if (urlQueryParams.rankBy === "DISTANCE" && !urlQueryParams.type) {
        alert("If rankBy is DISTANCE, type parameter must be provided.")
        return
    }

    if (urlQueryParams.rankBy === "PROMINENCE" && radius === "") {
        alert("If rankBy is DISTANCE, radius parameter must be provided.")
        return
    }
        
    if (urlQueryParams.rankBy && urlQueryParams.rankBy === "DISTANCE") {
            queryParams.rankBy = window.google.maps.places.RankBy.DISTANCE
            queryParams.type = [urlQueryParams.type]
    }
    
    if (urlQueryParams.rankBy && urlQueryParams.rankBy === "PROMINENCE") {
            queryParams.rankBy = window.google.maps.places.RankBy.PROMINENCE
            queryParams.radius = radius
    }

    if (!urlQueryParams.rankBy) {
        queryParams.radius = radius
    }

    PLACES_SERVICE.nearbySearch(queryParams, getResultsAndCallReceiver);
}


export default fetchGoogleNearbySearchResults;

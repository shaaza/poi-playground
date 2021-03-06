export const FOURSQUARE_DEFAULT_URLS = {
    "suggestcompletion": "https://api.foursquare.com/v2/venues/suggestcompletion?v=20170101",
    "search": "https://api.foursquare.com/v2/venues/search?v=20170101"
}

export const FOURSQUARE_DEFAULT_KEY_PARAMS = "&client_id=ORIOILKCING2XM2BAE4RXLPNSCDKWXC1KGIOQX3EAAUGCZ0E&client_secret=S2FTCWQ0POSIKE52AC2XMY5EI3UK3IR5ZKBLEBCQ2MB21HAN";

export const GOOGLE_DEFAULT_URLS = {
    "placesAutocomplete": "https://maps.googleapis.com/maps/api/places/autocomplete",
    "fullTextSearch": "https://maps.googleapis.com/maps/api/place/textsearch",
    "nearbyPlaces": "https://maps.googleapis.com/maps/api/place/nearbysearch?rankBy=DISTANCE&type=establishment",
    "reverseGeocode": "https://maps.googleapis.com/maps/api/geocode"
}

export const GOOGLE_DEFAULT_KEY_PARAMS = window.localStorage.getItem('gmapsKey');

export const MARKER_COLORS = {
    "foursquareSuggestCompletion": "orange",
    "placesAutocomplete": "green",
    "foursquareSearch": "orange",
    "fullTextSearch": "green",
    "googleNearbyPlaces": "orange",
    "googleReverseGeocode": "green"
}
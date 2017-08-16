
function getOrSetMapsKey() {
    let GMAPS_KEY = window.localStorage.getItem('gmapsKey');
    if (GMAPS_KEY === null) {
        GMAPS_KEY = window.prompt("Please enter google maps key");
        if (GMAPS_KEY !== "") {
            window.localStorage.setItem('gmapsKey', GMAPS_KEY)
        } else {
            alert("Please enter a key before proceeding.");
            window.location.reload();
        }
    }
    return GMAPS_KEY;
}

function loadGoogleMapsWithKey(onGoogleMapsLoaded) {
    var GMAPS_KEY = getOrSetMapsKey();
    var GMAPS_SRC = "https://maps.googleapis.com/maps/api/js?key=" + GMAPS_KEY + "&libraries=geometry,places";
    var GMAPS_SCRIPT_ELEMENT = document.createElement('script');
    GMAPS_SCRIPT_ELEMENT.src = GMAPS_SRC;
    GMAPS_SCRIPT_ELEMENT.onload = onGoogleMapsLoaded;
    document.getElementsByTagName('head')[0].appendChild(GMAPS_SCRIPT_ELEMENT);
}


export default loadGoogleMapsWithKey;
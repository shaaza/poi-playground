import 'whatwg-fetch'

function fetchFourSquareResults({ baseUrl, query, latLng, radius, limit, keyParams }, receiverFunc) {
    let url = baseUrl
    url = url +"&query=" + query;
    if (latLng.length !== 0 && radius.length !== 0) {
        url = url + "&ll=" + latLng + "&radius=" + radius;
    }
    if (limit.length !== 0) {
        url = url + "&limit=" + limit;
    } else {
        url = url + "&limit=5";
    }
    if (keyParams.length !== 0) {
        url = url + keyParams
    } else { alert("Foursquare keys not provided.") }

    fetch(url)
        .then((response) => (response.json()))
        .then((json) => { 
            let locations = json['response']['venues'].map((i) => (
                {   
                    name: i.name, 
                    lat: i.location.lat, 
                    lng: i.location.lng,
                    address: i.location.address
                }))
            receiverFunc(locations) })
}

export default fetchFourSquareResults;

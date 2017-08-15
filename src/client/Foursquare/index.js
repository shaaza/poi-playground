import 'whatwg-fetch'

function fetchFourSquareResults({ baseUrl, query, latLng }, receiverFunc) {
    let url = baseUrl
    url = url + "&ll=" + latLng + "&query=" + query;
    fetch(url)
        .then((response) => (response.json()))
        .then((json) => { 
            let locations = json['response']['venues'].map((i) => (
                {   
                    name: i.name, 
                    lat: i.location.lat, 
                    lng: i.location.lng
                }))

            receiverFunc(locations) })
}

export default fetchFourSquareResults;

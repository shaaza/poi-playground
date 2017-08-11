import 'whatwg-fetch'

function placesAutocomplete(url) {
    fetch(url)
        .then((response) => (
            response.json()
        ))
}
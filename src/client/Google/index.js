import getParameterByName from '../../util/parseQueryParams'
var service = new window.google.maps.places.AutocompleteService();

function fetchGoogleResults(url, receiverFunc) {

    function displaySuggestions(predictions, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) { 
            alert(status); 
            return;
        }

        let locations = predictions.map((prediction) => ({
                name: prediction['structured_formatting']['main_text'],
                address: prediction['structured_formatting']['secondary_text'],
            })
        )
        console.log(locations)
        receiverFunc(locations)
    };

    service.getQueryPredictions({ input: getParameterByName('input', url) }, displaySuggestions);
}

export default fetchGoogleResults;

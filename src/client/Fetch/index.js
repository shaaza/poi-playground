import fetchFourSquareSearchResults from '../Foursquare/search.js';
import fetchFourSquareSuggestCompletionResults from '../Foursquare/suggestcompletion.js';
import fetchGoogleAutocompleteResults from '../Google/autocomplete.js';
import fetchGoogleTextSearchResults from '../Google/textsearch.js';
import fetchGoogleNearbySearchResults from '../Google/nearbysearch.js';


function fetchResults(queryDetails, receiverFunc) {
    let baseURL = queryDetails['baseUrl']
    switch (true) {
        case (baseURL.includes("foursquare") && baseURL.includes("suggestcompletion")):
            return fetchFourSquareSuggestCompletionResults(queryDetails, receiverFunc);
        case (baseURL.includes("foursquare") && baseURL.includes("search")):
            return fetchFourSquareSearchResults(queryDetails, receiverFunc);
        case baseURL.includes("google") && baseURL.includes("autocomplete"):
            return fetchGoogleAutocompleteResults(queryDetails, receiverFunc)
        case baseURL.includes("google") && baseURL.includes("textsearch"):
            return fetchGoogleTextSearchResults(queryDetails, receiverFunc)
        case baseURL.includes("google") && baseURL.includes("nearbysearch"):
            return fetchGoogleNearbySearchResults(queryDetails, receiverFunc)
        default:
            alert("No endpoint configured for that query!")
            return null;
    }
}

export default fetchResults;



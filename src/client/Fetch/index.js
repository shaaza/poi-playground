import fetchFourSquareSearchResults from '../Foursquare/search.js';
import fetchFourSquareSuggestCompletionResults from '../Foursquare/suggestcompletion.js';
import fetchGoogleResults from '../Google/index.js';

function fetchResults(queryDetails, receiverFunc) {
    let baseURL = queryDetails['baseUrl']
    switch (true) {
        case (baseURL.includes("foursquare") && baseURL.includes("suggestcompletion")):
            return fetchFourSquareSuggestCompletionResults(queryDetails, receiverFunc);
        case (baseURL.includes("foursquare") && baseURL.includes("search")):
            return fetchFourSquareSearchResults(queryDetails, receiverFunc);
        case baseURL.includes("google"):
            return fetchGoogleResults(queryDetails, receiverFunc)
        default:
            return null;
    }
}

export default fetchResults;



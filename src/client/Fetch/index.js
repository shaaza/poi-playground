import fetchFourSquareResults from '../Foursquare/index.js'
import fetchGoogleResults from '../Google/index.js'

function fetchResults (queryDetails, receiverFunc) {
    switch (true) {
        case queryDetails['baseUrl'].includes("foursquare"):
            return fetchFourSquareResults(queryDetails, receiverFunc);
        case queryDetails['baseUrl'].includes("google"):
            return fetchGoogleResults(queryDetails, receiverFunc)
        default:
            return null;
    }
}

export default fetchResults;

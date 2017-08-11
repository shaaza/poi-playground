import fetchFourSquareResults from '../Foursquare/index.js'
import fetchGoogleResults from '../Google/index.js'

function fetchResults (url, receiverFunc) {
    switch (true) {
        case url.includes("foursquare"):
            return fetchFourSquareResults(url, receiverFunc);
        case url.includes("google"):
            return fetchGoogleResults(url, receiverFunc)
        default:
            return null;
    }
}

export default fetchResults;

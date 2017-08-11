import fetchFourSquareResults from '../Foursquare/index.js'

function fetchResults (url, receiverFunc) {
    switch (true) {
        case url.includes("foursquare"):
            return fetchFourSquareResults(url, receiverFunc);
        default:
            return null;
    }
}

export default fetchResults;

function getOrCreateDummyMapDOMElement(id) {
    let dummyElement = document.getElementById(id)

    if (!dummyElement) {
        dummyElement = document.createElement('div')
        dummyElement.setAttribute('id', id)
        document.body.appendChild(dummyElement)
    }

    return dummyElement
}

function parseQueryParams(url) {
    let qstr = url.slice(url.indexOf('?') + 1)
    let query = {};
    let a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (let i = 0; i < a.length; i++) {
        let b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}

export {
    getOrCreateDummyMapDOMElement, 
    parseQueryParams
}
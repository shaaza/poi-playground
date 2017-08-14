function getOrCreateDummyMapDOMElement(id) {
    let dummyElement = document.getElementById(id)

    if (!dummyElement) {
        dummyElement = document.createElement('div')
        dummyElement.setAttribute('id', id)
        document.body.appendChild(dummyElement)
    }

    return dummyElement
}

export default getOrCreateDummyMapDOMElement;
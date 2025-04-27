export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

export const updateResponseData = (response = {}, value = {}) => {
    return { response, ...value }
}
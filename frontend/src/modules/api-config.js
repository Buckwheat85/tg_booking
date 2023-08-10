
const apiHost = '127.0.0.1'
const apiPort = '3000'
const apiProtocol = 'http'

const apiPath = apiProtocol + '://' + apiHost + ':' + apiPort

function getFullApiPath (apiQueryPath) {
    return apiPath + '/' + apiQueryPath
}

export default getFullApiPath
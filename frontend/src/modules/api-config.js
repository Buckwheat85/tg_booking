
const apiHost = '192.168.1.116'
const apiPort = '3000'
const apiProtocol = 'http'

const apiPath = apiProtocol + '://' + apiHost + ':' + apiPort

function getFullApiPath (apiQueryPath) {
    return apiPath + '/' + apiQueryPath
}

export default getFullApiPath
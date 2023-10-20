
const empresa = require('../components/empresa/interface')
const representante_legal = require('../components/representante_legal/interface')

const routes = function(server) {
   
    server.use('/empresa', empresa)
    server.use('/representante_legal', representante_legal)
}

module.exports = routes
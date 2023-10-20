const storage = require('./storage')

function get_empresa( filtroempresa ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtroempresa ) )
    })
}

function add_empresa( empresa ) {
    return new Promise((resolve, reject) => {
        if (!empresa.ruc || !empresa.nombre || !empresa.domicilio || !empresa.telefono) {
            return reject('No hay datos suficientes.')
        }
        storage.add( empresa )
        resolve( empresa )        
    })
}

function update_empresa( empresa ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( empresa )
        if (resultado) {
            return resolve( empresa )
        } else {
            return reject('No existe el empresa.')
        }
    })
}

function delete_empresa( ruc ) {
    return new Promise((resolve, reject) => {
        storage.delete( ruc )
        resolve( ruc )
    })
}

module.exports = {
    get_empresa,
    add_empresa,
    update_empresa,
    delete_empresa,
}
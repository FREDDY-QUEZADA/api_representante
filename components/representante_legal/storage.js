const model = require('./model');



function get_representante_legal(filtro_representante_legal) {
  return new Promise((resolve, reject) => {
    let filtro = {};
    if (filtro_representante_legal) {
      filtro = { ruc: filtro_representante_legal };
    }

    model
      .find(filtro)
      .populate({
        path: 'empresa_detalle',
        populate: {
          path: 'empresa',
          model: 'empresa',
        },
      })
      .exec()
      .then((data) => {
        const lista = data.map((elemento) => {
          const objeto = {
            id: elemento._id,
            cedula: elemento.cedula,
            nombre: elemento.nombre,
            apellido: elemento.apellido,
            email: elemento.email,
            domicilio: elemento.domicilio,
            telefono: elemento.telefono,
            total_empresas: elemento.empresa_detalle.length
          };
          
          return objeto;
        });

        resolve(lista);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


function add_representante_legal( representante_legal ) {
    representante_legal.fecha_creaccion = new Date()

    const objeto = new model( representante_legal )
    objeto.save()
}

async function update_representante_legal( representante_legal ) {
    const objeto = await model.findOne( {ruc: representante_legal.ruc} )

    if ( objeto ) {
        objeto.estado = False
        return resultado = await objeto.save()
    } else {
        return null
    }
}

async function delete_representante_legal( ruc ) {
    return await model.deleteOne({ruc: ruc})
}

module.exports = {
    add: add_representante_legal,
    get: get_representante_legal,
    update: update_representante_legal,
    delete: delete_representante_legal
}
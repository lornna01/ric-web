import Municipio from '#models/municipio'
import type { HttpContext } from '@adonisjs/core/http'

export default class MunicipiosController {


  async index({ response, request }: HttpContext) {
    try {

      const info = await Municipio.query()

        .orderBy('nombre', 'asc')
        .preload('departamento') // Cargar la relación 'rol'
        .exec()


      return response.ok(info)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener muni.' })
    }
  }

  /*
  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'departamento_id', 'estado']);
    const existe = await Municipio.query().where('nombre', data.nombre).first();
    if (!existe) {
      //const user = await Rol.create(data);
      const municipio = await Municipio.create(data);
      //return response.created(user);
      return response.created(municipio);
    } else {
      return response.badRequest({ message: "Ya existe un municipio:" + data.nombre });
    }
  }*/ 

    /* 
    //17/10/2024
  async store({ request, response }: HttpContext) {
    const data = request.all();
    try {
      const existe = await Municipio.query()
        .where('nombre', data.nombre)
        .where('departamento_id', data.departamento_id)

        .first();
      if (existe) {
        return response.badRequest({ message: "Ya existe" });
      }
      const municipio = await Municipio.create(data);
      return response.created(municipio);
    } catch (err) {
      console.error(err)
      return response.badRequest({ message: "Ya existe un municipio con el nombre: " + data.nombre });
    }
  }
*/

async store({ request, response }: HttpContext) {
  const data = request.only(['nombre', 'departamento_id', 'estado']);
  const existe = await Municipio.query().where('nombre', data.nombre).first();
  if (!existe) {
    //const user = await Rol.create(data);
    const municipio = await Municipio.create(data);
    //return response.created(user);
    return response.created(municipio);
  } else {
    return response.badRequest({ message: "Ya existe un Municipio:" + data.nombre });
  }
}

  async show({ params, response }: HttpContext) {
    const existe = await Municipio.findOrFail(params.id);
    return response.json(existe);
  }


  async update({ params, request, response }: HttpContext) {
    try {
      const municipio = await Municipio.findOrFail(params.id);
      if (municipio) {
        const data = request.all();

        municipio.nombre = data.nombre
        municipio.departamento_id = data.departamento_id
        municipio.estado = data.estado

        municipio.save()
        return response.json(municipio);
      } else {
        return response.badRequest({ message: "No existe" });
      }
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener municipio.' })
    }
  }


  /*
  async index({ response,request }: HttpContext) {
    try {
      
      const info = await Municipio.query()
      .where('departamento_id', request.input("departamento_id"))
      .orderBy('nombre', 'asc')
      .preload('departamento') // Cargar la relación 'rol'
      .exec()
        

      return response.ok(info)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener.' })
    }
  }

  
  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'departamento_id', 'estado']);
    const existe = await Municipio.query().where('nombre', data.nombre).first();
    if (!existe) {
      //const user = await Rol.create(data);
      const model = await Municipio.create(data);
      //return response.created(user);
      return response.created(model);
    } else {
      return response.badRequest({ message: "Ya existe un municipio:" + data.nombre });
    }
  }


    async show({ params, response }: HttpContext) {
      const data = await Municipio.findOrFail(params.id);
      return response.json(data);
    }


    async showByNombreMun({ params, response }: HttpContext) {
      const existe = await Municipio.query().where('nombre', params.nombre).first();
      if (existe) {
        return response.json(existe);
      } else {
        return response.badRequest({ message: "No existe:" + params.nombre });
      }
    }



  async update({ params, request,response }: HttpContext) {
    const model = await Municipio.query().where('nombre', params.id).first();
    if (model) {
      const data = request.only(['nombre', 'departamento_id', 'estado']);
      model.nombre = data.nombre
      model.departamento_id = data.departamento_id
      model.estado = data.estado

      model.save()
      return response.json(model);
    } else {
      return response.badRequest({ message: "No existe" });
    }
  }

  async destroy({ params,response }: HttpContext) {
    const municipio = await Municipio.find(params.id);
    if (!municipio) {
      return response.badRequest({ message: "No encontrado" });
    }

    await municipio.delete();
    return response.json({ message: "Eliminado" });
  }

  */

  




}
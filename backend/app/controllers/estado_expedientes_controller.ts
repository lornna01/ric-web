import EstadoExpediente from '#models/estado_expediente'
import type { HttpContext } from '@adonisjs/core/http'

export default class EstadoExpedientesController {
  
  //NO, BASO EN EXPEDIENTES
  async index({ response }: HttpContext) {
    const data = await EstadoExpediente.all();
    return response.json(data);
  }


  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre']);
    const existe = await EstadoExpediente.query().where('nombre', data.nombre).first();
    if (!existe) {
      //const user = await Rol.create(data);
      const estadoExpediente = await EstadoExpediente.create(data);
      //return response.created(user);
      return response.created(estadoExpediente);
    } else {
      return response.badRequest({ message: "Ya existe un estado con el nombre: " + data.nombre });
    }
  }

  async show({ params, response }: HttpContext) {
    const existe = await EstadoExpediente.findOrFail(params.id);
    return response.json(existe);
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const model = await EstadoExpediente.findOrFail(params.id);
      if (model) {
        const data = request.all();

        model.nombre = data.nombre
        

        model.save()
        return response.json(model);
      } else {
        return response.badRequest({ message: "No existe" });
      }
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener rolssss.' })
    }
  }




  /**
   * Delete record
   */
  
  async destroy({ params,response }: HttpContext) {
    const estadoExpediente = await EstadoExpediente.findOrFail(params.id);
    if (estadoExpediente) {
      estadoExpediente.delete();
      return response.json({message:"Usuario eliminado!"});
    } else {
      return response.badRequest({ message: "No existe un usuario"});
    }
  }

}
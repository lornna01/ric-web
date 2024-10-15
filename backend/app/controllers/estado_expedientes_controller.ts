import EstadoExpediente from '#models/estado_expediente';
import type { HttpContext } from '@adonisjs/core/http'

export default class EstadoExpedientesController {
   /**
   * Display a list of resource
   */
   async index({ response }: HttpContext) {
    const data = await EstadoExpediente.all();
    return response.json(data);
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,response }: HttpContext) {
    const data = request.only(['nombre']);
    const existe = await EstadoExpediente.query().where('nombre', data.nombre).first();
    if (!existe) {
      const model = await EstadoExpediente.create(data);
      return response.created(model);
    } else {
      return response.badRequest({ message: "Ya existe :" + data.nombre });
    }
  }

  /**
   * Show individual record
   */
  async show({ params,response }: HttpContext) {
    const data = await EstadoExpediente.findOrFail(params.id);
    return response.json(data);
  }




  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
    const model = await EstadoExpediente.findOrFail(params.id);
    if (model) {
      const data = request.only(['nombre']);
      model.nombre = data.nombre
     
      model.save()
      return response.json(model);
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }
    

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {
    const estadoExpediente = await EstadoExpediente.findOrFail(params.id);
    if (estadoExpediente) {
      estadoExpediente.delete();
      return response.json({message:"eliminado!"});
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }
  

}
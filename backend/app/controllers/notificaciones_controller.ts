//import Combustible from '#models/combustible'
import Notificacion from '#models/notificacion';
//import Vehiculo from '#models/vehiculo';
import type { HttpContext } from '@adonisjs/core/http'

export default class NotificacionesController {
  
  async index({ response,request }: HttpContext) {
    try {
      
      const info = await Notificacion.query().where('usuario_id', request.input('usuario_id')).orderBy('id','desc').exec();
      return response.ok(info)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener.' })
    }
  }

 
  async store({ request,response }: HttpContext) {
    const data = request.all();
    const existe = await Notificacion.query().where('usuario_id', request.input('usuario_id')).exec();
    if (existe) {
      const model = await Notificacion.create(data);
      return response.created(model);
    } else {
      return response.notFound({ message: "No existe" });
    }
  }

  async show({ params, response }: HttpContext) {
    const existe = await Notificacion.findBy(params.id);
    if(existe)
      return response.json(existe);
    return response.notFound();
  }

  
  async update({ params, request,response }: HttpContext) {
    try {
      const data = request.all();

        const model = await Notificacion.query().where('id', params.id).first();
        model!!.visto = data.visto
        model!!.save()
        return response.json(model);
  
  } catch (error) {
    console.error(error)
    return response.badRequest({ message: 'Error al obtener.' })
  }
  }

  
  async destroy({ params,response }: HttpContext) {
    const expe = await Notificacion.findOrFail(params.id);
    if (expe) {
      expe.delete();
      return response.json({message:"eliminado!"});
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }
}
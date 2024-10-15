import Boleta from '#models/boleta';
import type { HttpContext } from '@adonisjs/core/http'

export default class BoletasController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      
      const info = await Boleta.all();
      return response.ok(info)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener.' })
    }
  }

  async showBySerie({ params,response }: HttpContext) {
    const existe = await Boleta.query().where('serie', params.serie).first();
    if (existe) {
      return response.json(existe);
    } else {
      return response.badRequest({ message: "No existe:" + params.serie });
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,response }: HttpContext) {
    const data = request.all();
    const existe = await Boleta.query().where('serie', data.serie).first();
    if (!existe) {
      const model = await Boleta.create(data);
      return response.created(model);
    } else {
      return response.badRequest({ message: "Existe el vehículo" });
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const existe = await Boleta.findBy(params.id);
    if(existe)
      return response.json(existe);
    return response.notFound();
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
    try {
      const data = request.all();

        const model = await Boleta.query().where('id', params.id).first();
        model!!.fecha = data.fecha
        model!!.serie = data.serie
        model!!.pais = data.pais
        model!!.departamento = data.departamento
        model!!.edad = data.edad
        model!!.genero = data.genero
        model!!.motivo = data.motivo
        model!!.actividad = data.actividad
        model!!.entero = data.entero
        model!!.viaja = data.viaja
        model!!.correo = data.correo
        
        model!!.usuario_id = data.usuario_id
        
        model!!.save()
        return response.json(model);
  
  } catch (error) {
    console.error(error)
    return response.badRequest({ message: 'Error al obtener.' })
  }
  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {
    const expe = await Boleta.findOrFail(params.id);
    if (expe) {
      expe.delete();
      return response.json({message:"eliminado!"});
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }
}
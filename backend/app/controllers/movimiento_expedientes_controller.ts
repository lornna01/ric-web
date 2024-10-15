import MovimientoExpediente from '#models/movimiento_expediente'
import type { HttpContext } from '@adonisjs/core/http'

export default class MovimientoExpedientesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const info = await MovimientoExpediente.query()
      .orderBy('id', 'desc')
        .preload('expediente')
        .preload('usuario', (builder) => {
          builder.preload('rol')
        }) 
        .preload('usuario_destino')
        .exec()
        

      return response.ok(info)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener.' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,response }: HttpContext) {
    const data = request.all();
    try {

      const model = await MovimientoExpediente.create(data);
      return response.created(model);
    } catch (err) {
      console.error(err)
      return response.badRequest({ message: "Verifica los datos",data ,err });
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const info = await MovimientoExpediente.query()
    .where('expediente_id', params.id)
    .orderBy('id', 'desc')
    .preload('expediente') // Asegúrate de que estos nombres coincidan con los definidos en el modelo
    .preload('usuario', (builder) => {
      builder.preload('rol')
    })
    .preload('usuario_destino', (builder) => {
      builder.preload('rol')
    })
        .exec()
      return response.json(info);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
    try{
    const model = await MovimientoExpediente.findOrFail(params.id);
      if (model) {
      const data = request.all();

        model.fecha_entrega = data.fecha_entrega
        model.updatedAt = data.updated_at
        model.save()
        return response.json(model);
    } else {
      return response.badRequest({ message: "No existe"});
    }
  } catch (error) {
    console.error(error)
    return response.badRequest({ message: 'Error al obtener.' })
  }
  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {
    const expe = await MovimientoExpediente.findOrFail(params.id);
    if (expe) {
      expe.delete();
      return response.json({message:"Exp eliminado!"});
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }
}
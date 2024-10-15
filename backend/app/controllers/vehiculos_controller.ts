import Vehiculo from '#models/vehiculo';
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiculosController {
  /**
   * Display a list of resource
   */
  async index({response }: HttpContext) {
    const data = await Vehiculo.all();
    return response.json(data);
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all();
    const existe = await Vehiculo.query().where('placa', data.placa).first();
    if (!existe) {
      const model = await Vehiculo.create(data);
      return response.created(model);
    } else {
      return response.badRequest({ message: "Ya existe :" + data.placa });
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    
  }

  async showByPlaca({ params,response }: HttpContext) {
    const existe = await Vehiculo.query().where('placa', params.placa).first();
    if (existe) {
      return response.json(existe);
    } else {
      return response.badRequest({ message: "No existe:" + params.placa });
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    
    const model = await Vehiculo.query().where('placa', params.id).first();
    if (model) {
      const data = request.all();
      model.propietario = data.nombre
      model.placa = data.placa
      model.modelo = data.modelo
      model.chofer = data.chofer
      model.foto = data.foto
      model.comentarios = data.comentarios
      model.usuario_id = data.usuario_id
     
      model.save()
      return response.json(model);
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const vehiculo = await Vehiculo.find(params.id);

    if (!vehiculo) {
      return response.badRequest({ message: "No encontrado"});
    }

    await vehiculo.delete();
    return response.json({ message: "Eliminado"});
  }
}
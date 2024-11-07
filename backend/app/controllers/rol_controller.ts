import Rol from '#models/rol'; // Cambiado a la ruta correcta del modelo
import type { HttpContext } from '@adonisjs/core/http'

export default class RolController {
 
  //NO, BASO EN EXPEDIENTES
  async index({ response }: HttpContext) {
    const data = await Rol.all();
    return response.json(data);
  }


  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'descripcion', 'estado']);
    const existe = await Rol.query().where('nombre', data.nombre).first();
    if (!existe) {
      //const user = await Rol.create(data);
      const rol = await Rol.create(data);
      //return response.created(user);
      return response.created(rol);
    } else {
      return response.badRequest({ message: "Ya existe un rol con el nombre: " + data.nombre });
    }
  }

  async show({ params, response }: HttpContext) {
    const existe = await Rol.findOrFail(params.id);
    return response.json(existe);
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const model = await Rol.findOrFail(params.id);
      if (model) {
        const data = request.all();

        model.nombre = data.nombre
        model.descripcion = data.descripcion
        model.estado = data.estado

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


  async destroy({ params,response }: HttpContext) {
    const rol = await Rol.findOrFail(params.id);
    if (rol) {
      rol.delete();
      return response.json({message:"Rol eliminado!"});
    } else {
      return response.badRequest({ message: "No existe un rol"});
    }
  }



}

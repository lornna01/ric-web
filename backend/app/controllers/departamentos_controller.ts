import Departamento from '#models/departamento';
import type { HttpContext } from '@adonisjs/core/http'

export default class DepartamentosController {


  async index({ response }: HttpContext) {
    const data = await Departamento.all();
    return response.json(data);
  }
  
   
  async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'estado']);
    const existe = await Departamento.query().where('nombre', data.nombre).first();
    if (!existe) {
      //const user = await Rol.create(data);
      const departamento = await Departamento.create(data);
      //return response.created(user);
      return response.created(departamento);
    } else {
      return response.badRequest({ message: "Ya existe un departamento:" + data.nombre });
    }
  }
  
  
  async show({ params, response }: HttpContext) {
    const data = await Departamento.findOrFail(params.id);
    return response.json(data);
  }
  
  
  async update({ params, request, response }: HttpContext) {
    try {
      const departamento = await Departamento.findOrFail(params.id);
      if (departamento) {
        const data = request.all();

        departamento.nombre = data.nombre
        departamento.estado = data.estado

        departamento.save()
        return response.json(departamento);
      } else {
        return response.badRequest({ message: "No existe" });
      }
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener departamentos.' })
    }
  }
  
  

  





/*
async index({ response }: HttpContext) {
  const data = await Departamento.all();
  return response.json(data);
}

async showByNombreDep({ params, response }: HttpContext) {
  const existe = await Departamento.query().where('nombre', params.nombre).first();
  if (existe) {
    return response.json(existe);
  } else {
    return response.badRequest({ message: "No existe:" + params.nombre });
  }
} 

async store({ request, response }: HttpContext) {
  const data = request.only(['nombre', 'estado']);
  const existe = await Departamento.query().where('nombre', data.nombre).first();
  if (!existe) {
    //const user = await Rol.create(data);
    const departamento = await Departamento.create(data);
    //return response.created(user);
    return response.created(departamento);
  } else {
    return response.badRequest({ message: "Ya existe un departamento:" + data.nombre });
  }
}


async show({ params, response }: HttpContext) {
  const data = await Departamento.findOrFail(params.id);
  return response.json(data);
}





async update({ params, request, response }: HttpContext) {
  const departamento = await Departamento.query().where('nombre', params.id).first();
  if (departamento) {
    const data = request.only(['nombre', 'estado']);
    departamento.nombre = data.nombre
    departamento.estado = data.estado

    departamento.save()
    return response.json(departamento);
  } else {
    return response.badRequest({ message: "No existe" });
  }
}


async destroy({ params, response }: HttpContext) {
  const departamento = await Departamento.find(params.id);

  if (!departamento) {
    return response.badRequest({ message: "No encontrado" });
  }

  await departamento.delete();
  return response.json({ message: "Eliminado" });
}

*/



}
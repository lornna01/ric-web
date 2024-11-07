import Unidad from '#models/unidad';
//import Unidad from '#models/unidad'; // Cambiado a la ruta correcta del modelo
import type { HttpContext } from '@adonisjs/core/http'

export default class UnidadController {
 
    async index({ response }: HttpContext) {
        const data = await Unidad.all();
        return response.json(data);
      }
      
        
      async store({ request, response }: HttpContext) {
        const data = request.only(['nombre']);
        const existe = await Unidad.query().where('nombre', data.nombre).first();
        if (!existe) {
          
          const unidad = await Unidad.create(data);
          
          return response.created(unidad);
        } else {
          return response.badRequest({ message: "Ya existe una unidad:" + data.nombre });
        }
      }
      
      
      async show({ params, response }: HttpContext) {
        const data = await Unidad.findOrFail(params.id);
        return response.json(data);
      }
      
      
      async update({ params, request, response }: HttpContext) {
        try {
          const unidad = await Unidad.findOrFail(params.id);
          if (unidad) {
            const data = request.all();
    
            unidad.nombre = data.nombre
            
    
            unidad.save()
            return response.json(unidad);
          } else {
            return response.badRequest({ message: "No existe" });
          }
        } catch (error) {
          console.error(error)
          return response.badRequest({ message: 'Error al obtener unidades.' })
        }
      }
      
      
      async destroy({ params,response }: HttpContext) {
        const unidad = await Unidad.findOrFail(params.id);
        if (unidad) {
            unidad.delete();
          return response.json({message:"Unidad eliminada!"});
        } else {
          return response.badRequest({ message: "No existe."});
        }
      }
    

}

import Combustible from '#models/combustible'
import Vehiculo from '#models/vehiculo';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CombustiblesController {
  /**
   * Display a list of resource
   */
  async index({ response, request }: HttpContext) {
    try {

      const info = await Combustible.query().where('placa', request.input('placa')).orderBy('id', 'desc').exec();
      return response.ok(info)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener.' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all();
    const existe = await Vehiculo.query().where('placa', data.placa).first();
    if (existe) {
      const model = await Combustible.create(data);
      return response.created(model);
    } else {
      return response.notFound({ message: "No existe el vehículo" });
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const existe = await Combustible.findBy(params.id);
    if (existe)
      return response.json(existe);
    return response.notFound();
  }



  async update({ params, request,response }: HttpContext) {
    const combustible = await Combustible.findOrFail(params.id);
    if (combustible) {
      const data = request.only(['fecha', 'placa', 'kilometraje_inicial','kilometraje_final', 'chofer', 'cupon_desde', 'cupon_hasta', 'denominacion', 'saldo_inicio', 'saldo_final', 'galones', 'consumo', 'rendimiento', 'estado_cupon', 'observacion_cupon', 'pdf', 'unidad']);
      
      combustible.fecha = data.fecha
      combustible.placa = data.placa
      combustible.kilometraje_inicial = data.kilometraje_inicial
      combustible.kilometraje_final = data.kilometraje_final
      combustible.chofer = data.chofer
      combustible.cupon_desde = data.cupon_desde
      combustible.cupon_hasta= data.cupon_hasta
      combustible.denominacion = data.denominacion
      combustible.saldo_inicio = data.saldo_inicio
      combustible.saldo_final = data.saldo_final      
      combustible.galones = data.galones
      combustible.consumo = data.consumo
      combustible.rendimiento = data.rendimiento
      combustible.estado_cupon = data.estado_cupon
      combustible.observacion_cupon = data.observacion_cupon
      combustible.unidad = data.unidad
      combustible.pdf = data.pdf
      combustible.save()
      return response.json(combustible);
    } else {
      return response.badRequest({ message: "No existe "});
    }
  }





  // 15/10/2024 00:21
  async reporteCombustible({ request, response }: HttpContext) {
    try {
      const fechaInicio = request.input('fechaInicio'); // Obtener fecha de inicio
      const fechaFin = request.input('fechaFin'); // Obtener fecha de fin
      const placa = request.input('placa'); // Obtener placa


      // Construir la consulta
      let query = `
      SELECT * 
      FROM reporteCombustibleRendimiento 
      WHERE fechaInicio >= '${fechaInicio}' 
        AND fechaInicio <= '${fechaFin}'
    `;

      // Agregar filtros si se proporcionan
      if (placa) {
        query += ` AND placa = '${placa}'`; // Agregar comillas simples
      }



      // Ejecutar la consulta
      const combustible = await db.rawQuery(query);

      console.log(query); // Imprimir la consulta en la consola
      console.log(combustible); // Imprimir los resultados en la consola
      response.status(200).json(combustible.rows);
    } catch (error) {
      return response.internalServerError({ message: 'Error fetching expediente', error });
    }
  }



  async destroy({ params, response }: HttpContext) {
    const combustib = await Combustible.findOrFail(params.id);
    if (combustib) {
      combustib.delete();
      return response.json({ message: "Combustible eliminado!" });
    } else {
      return response.badRequest({ message: "No existe." });
    }
  }


  

}
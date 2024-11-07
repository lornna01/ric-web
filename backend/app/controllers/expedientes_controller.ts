import Expediente from '#models/expediente'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'



export default class ExpedientesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const info = await Expediente.query()
      .orderBy('id', 'desc')
      .preload('estado')
      .preload('municipio')
      .preload('departamento')
      .preload('usuario', (builder) => {
        builder.preload('rol')
      }) // Cargar la relación 'rol'
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
      const existe = await Expediente.query()
        .where('predio', data.predio)
        .where('departamento_id', data.departamento_id)
        .where('municipio_id', data.municipio_id)
        .where('poligono', data.poligono)
        .first();
        if (existe) {
          return response.badRequest({ message: "Ya existe" });
        }
      const user = await Expediente.create(data);
      return response.created(user);
    } catch (err) {
      console.error(err)
      return response.badRequest({ message: "Verifica los datos",data });
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const existe = await Expediente.findOrFail(params.id);
      return response.json(existe);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
    try{
    const model = await Expediente.findOrFail(params.id);
      if (model) {
      const data = request.all();

        model.departamento_id = data.departamento_id
        model.municipio_id = data.municipio_id
        model.poligono = data.poligono
        model.predio = data.predio
        model.leitz = data.leitz
        model.titular = data.titular
        model.estanteria = data.estanteria
        model.nivel = data.nivel
        model.hojas = data.hojas
        model.comentarios = data.comentarios
        model.expediente_estado_id = data.expediente_estado_id
        model.archivo = data.archivo
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


/*
  async reporteExpediente({ request, response }: HttpContext) {
    try {
      const fechaInicio = request.input('fechaInicio')
      const fechaFin = request.input('fechaFin')
      const expedientes = await db.rawQuery(`
        SELECT * FROM public.reporteExpedienteNombre WHERE fechaInicio >= '${fechaInicio}' AND fechaInicio <= '${fechaFin}'
      `)
      console.log(`
        SELECT * FROM public.reporteExpedienteNombre WHERE fechaInicio >= '${fechaInicio}' AND fechaInicio <= '${fechaFin}'
      `)
      console.log(expedientes)
      response.status(200).json(expedientes.rows)
    } catch (error) {
      return response.internalServerError({ message: 'Error fetching expediente', error })
    }
  }

*/



/*

async reporteExpediente({ request, response }: HttpContext) {
  try {
    const fechaInicio = request.input('fechaInicio');
    const fechaFin = request.input('fechaFin');

    console.log("Fecha Inicio (Backend):", fechaInicio);
    console.log("Fecha Fin (Backend):", fechaFin);

    const expedientes = await db.rawQuery(`
      SELECT * FROM public.reporteExpedienteNombre 
      WHERE fechaInicio >= '${fechaInicio}' 
      AND fechaInicio <= '${fechaFin}'
    `);

    response.status(200).json(expedientes.rows);
  } catch (error) {
    console.error("Error en el controlador:", error);
    return response.internalServerError({ message: 'Error fetching expediente', error });
  }
}*/

/*
async reporteExpediente({ request, response }: HttpContext) {
  try {
    const fechaInicio = request.input('fechaInicio');
    const fechaFin = request.input('fechaFin');

    // Imprimir para depuración
    console.log("Fecha Inicio (Backend):", fechaInicio);
    console.log("Fecha Fin (Backend):", fechaFin);

    // Usar parámetros para prevenir inyecciones SQL y errores en formato
    const expedientes = await db.rawQuery(`
      SELECT * 
      FROM public.reporteExpedienteNombre 
      WHERE fechaInicio >= ? 
      AND fechaInicio <= ?`, [fechaInicio, fechaFin]);

    // Retornar los expedientes
    response.status(200).json(expedientes.rows);
  } catch (error) {
    console.error("Error en el controlador:", error);
    return response.internalServerError({ message: 'Error fetching expediente', error });
  }
}
*/

/*
async reporteExpediente({ request, response }: HttpContext) {
  try {
    const fechaInicio = request.input('fechaInicio');
    const fechaFin = request.input('fechaFin');

    // Imprimir para depuración
    console.log("Fecha Inicio (Backend):", fechaInicio);
    console.log("Fecha Fin (Backend):", fechaFin);

    const expedientes = await db.rawQuery(`
      SELECT * 
      FROM public.reporteExpedienteNombre 
      WHERE fechaInicio >= ? 
      AND fechaInicio <= ?`, [fechaInicio, fechaFin]);

    // Asegurarse de que el resultado sea un arreglo
    if (!Array.isArray(expedientes.rows)) {
      console.error("Error: La respuesta no es un arreglo");
      return response.status(500).json({ message: 'Error: La respuesta no es un arreglo' });
    }

    // Retornar los expedientes
    return response.status(200).json(expedientes.rows);
  } catch (error) {
    console.error("Error en el controlador:", error);
    return response.internalServerError({ message: 'Error fetching expediente', error });
  }
}
*/



/*
async reporteExpediente({ request, response }: HttpContext) {
  try {
    const fechaInicio = request.input('fechaInicio');
    const fechaFin = request.input('fechaFin');

    console.log('Fecha de Inicio:', fechaInicio);
    console.log('Fecha de Fin:', fechaFin);

    const expedientes = await db.rawQuery(`
      SELECT * FROM public.reporteExpedienteNombre WHERE fechaInicio >= '${fechaInicio}' AND fechaInicio <= '${fechaFin}'
    `);
    console.log(`Consulta ejecutada: SELECT * FROM public.reporteExpedienteNombre WHERE fechaInicio >= '${fechaInicio}' AND fechaInicio <= '${fechaFin}'`);
    console.log(expedientes);
    
    response.status(200).json(expedientes.rows);
  } catch (error) {
    console.error('Error al obtener expediente:', error);
    return response.internalServerError({ message: 'Error fetching expediente', error });
  }
}
*/



/* final 14/10/2024 11:35
async reporteExpediente({ request, response }: HttpContext) {
  try {
    const fechaInicio = request.input('fechaInicio');
    const fechaFin = request.input('fechaFin');
    const expedientes = await db.rawQuery(`
      SELECT * FROM public.reporteExpedienteNombre WHERE fechaInicio >= '${fechaInicio}' AND fechaInicio <= '${fechaFin}'
    `);
    console.log(`
      SELECT * FROM public.reporteExpedienteNombre WHERE fechaInicio >= '${fechaInicio}' AND fechaInicio <= '${fechaFin}'
    `);
    console.log(expedientes);
    response.status(200).json(expedientes.rows);
  } catch (error) {
    return response.internalServerError({ message: 'Error fetching expediente', error });
  }
}
*/

/* 14/10/2024 13:22
async reporteExpediente({ request, response }: HttpContext) {
  try {
    const fechaInicio = request.input('fechaInicio'); // Obtener fecha de inicio
    const fechaFin = request.input('fechaFin'); // Obtener fecha de fin
    const idDepartamento = request.input('departamento_id'); // Obtener departamento_id
    const idMmunicipio = request.input('municipio_id'); // Obtener municipio_id

    const expedientes = await db.rawQuery(`
      SELECT * 
      FROM public.reporteExpedienteNombre 
      WHERE fechaInicio >= '${fechaInicio}' 
        AND fechaInicio <= '${fechaFin}' 
        AND departamento_id = ${idDepartamento}
        AND municipio_id = ${idMmunicipio} -- Filtrar por departamento_id
    `);
    
    console.log(`
      SELECT * 
      FROM public.reporteExpedienteNombre 
      WHERE fechaInicio >= '${fechaInicio}' 
        AND fechaInicio <= '${fechaFin}' 
        AND departamento_id = ${idDepartamento}
        AND municipio_id = ${idMmunicipio} -- Filtrar por departamento_id
    `);
    console.log(expedientes);
    response.status(200).json(expedientes.rows);
  } catch (error) {
    return response.internalServerError({ message: 'Error fetching expediente', error });
  }
}
*/

// 14/10/2024 14:00 
async reporteExpediente({ request, response }: HttpContext) {
  try {
    const fechaInicio = request.input('fechaInicio'); // Obtener fecha de inicio
    const fechaFin = request.input('fechaFin'); // Obtener fecha de fin
    const idDepartamento = request.input('departamento_id'); // Obtener departamento_id
    const idMunicipio = request.input('municipio_id'); // Obtener municipio_id
    const idEstadoExpediente = request.input('expediente_estado_id'); // Obtener municipio_id

    // Construir la consulta
    let query = `
      SELECT * 
      FROM public.reporteExpedienteNombre
      WHERE fechaInicio >= '${fechaInicio}' 
        AND fechaInicio <= '${fechaFin}'
    `;
 
    // Agregar filtros si se proporcionan
    if (idDepartamento) {
      query += ` AND departamento_id = ${idDepartamento}`;
    }
    
    if (idMunicipio) {
      query += ` AND municipio_id = ${idMunicipio}`;
    }

    if (idEstadoExpediente) {
      query += ` AND expediente_estado_id = ${idEstadoExpediente}`; // Agregar comillas alrededor del nombre del estado
    }


    // Ejecutar la consulta
    const expedientes = await db.rawQuery(query);
    
    console.log(query); // Imprimir la consulta en la consola
    console.log(expedientes); // Imprimir los resultados en la consola
    response.status(200).json(expedientes.rows);
  } catch (error) {
    return response.internalServerError({ message: 'Error fetching expediente', error });
  }
}



  /** 
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {
    const expe = await Expediente.findOrFail(params.id);
    if (expe) {
      expe.delete();
      return response.json({message:"Exp eliminado!"});
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }









}
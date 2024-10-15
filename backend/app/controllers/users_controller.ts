
import Person from '#models/person'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const users = await User.query()
        .preload('rol') // Cargar la relación 'rol'
        .exec()
        

      return response.ok(users)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener usuarios con roles.' })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,response }: HttpContext) {
    const data = request.all();
    const existe = await User.query().where('email', data.email).first();
    if (!existe) {
      const user = await User.create(data);
      return response.created(user);
    } else {
      return response.badRequest({ message: "Ya existe un usuario con correo:" + data.email });
    }
  }

  /**
   * Show individual record
   */
  async show({ params,response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    return response.json(user);
  }

  /**
   * Handle form submission for the edit action
   */
  /*
  async update({ params, request,response }: HttpContext) {
    const user = await User.findOrFail(params.id);

    if (user) {
      const data = request.only(['nombre', 'email', 'password','estado', 'rol_id' ,'foto']);

      user.nombre = data.nombre
      user.email = data.email
      user.password = data.password
      user.estado = data.estado
      user.foto = data.foto
      user.rol_id = data.rol_id

      user.save()
    
      return response.json(user);
    } else {
      return response.badRequest({ message: "No existe un usuario"});
    }
  }
    */

  async update({ params, request, response }: HttpContext) {
    try {
      // Buscar al usuario y a la persona relacionada
      const user = await User.findOrFail(params.id);
      const persona = await Person.findOrFail(params.id);  // Asumiendo que existe una relación 'user_id'

      // Obtener los datos enviados desde la petición
      const data = request.only(['nombre', 'email', 'password', 'estado', 'rol_id', 'foto']);
      const dataPersona = request.only(['dpi']);  // Obtener el DPI enviado

      // Actualizar los datos del usuario
      user.nombre = data.nombre;
      user.email = data.email;
      if (data.password) {
        user.password = data.password; // Actualizar solo si se ha proporcionado una nueva contraseña
      }
      user.estado = data.estado;
      user.foto = data.foto;
      user.rol_id = data.rol_id;

      // Actualizar el DPI en la tabla Person
      persona.dpi = dataPersona.dpi;

      // Guardar ambas entidades
      await user.save();
      await persona.save();

      return response.json({ user, persona });
    } catch (error) {
      console.error(error);
      return response.badRequest({ message: "Error al actualizar el usuario y la persona." });
    }
  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    if (user) {
      user.delete();
      return response.json({message:"Usuario eliminado!"});
    } else {
      return response.badRequest({ message: "No existe un usuario"});
    }
  }
}











/*
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {


  async index({ response }: HttpContext) {
    try {
      const users = await User.query()
        .preload('rol') // Cargar la relación 'rol'
        .exec()
        

      return response.ok(users)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener usuarios con roles.' })
    }
  }


  async store({ request,response }: HttpContext) {
    const data = request.all();
    const existe = await User.query().where('email', data.email).first();
    if (!existe) {
      const user = await User.create(data);
      return response.created(user);
    } else {
      return response.badRequest({ message: "Ya existe un usuario con correo:" + data.email });
    }
  }


  async show({ params,response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    return response.json(user);
  }


  async update({ params, request,response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    if (user) {
      const data = request.only(['nombre', 'email', 'password','estado', 'rol_id' ,'foto']);
      user.nombre = data.nombre
      user.email = data.email
      user.password = data.password
      user.estado = data.estado
      user.foto = data.foto
      user.rol_id = data.rol_id
      user.save()
      return response.json(user);
    } else {
      return response.badRequest({ message: "No existe un usuario"});
    }
  }


  async destroy({ params,response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    if (user) {
      user.delete();
      return response.json({message:"Usuario eliminado!"});
    } else {
      return response.badRequest({ message: "No existe un usuario"});
    }
  }
}


*/





/*
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

  async index({ response }: HttpContext) {
    try {
      const users = await User.query()
        .preload('rol') // Cargar la relación 'rol'
        .exec()
        

      return response.ok(users)
    } catch (error) {
      console.error(error)
      return response.badRequest({ message: 'Error al obtener usuarios con roles.' })
    }
  }

 
  async store({ request,response }: HttpContext) {
    const data = request.all();
    const existe = await User.query().where('email', data.email).first();
    if (!existe) {
      const user = await User.create(data);
      return response.created(user);
    } else {
      return response.badRequest({ message: "Ya existe un usuario con correo:" + data.email });
    }
  }

  
  async show({ params,response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    return response.json(user);
  }


  async update({ params, request,response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    if (user) {
      const data = request.only(['nombre', 'email', 'password','estado', 'rol_id' ,'foto']);
      user.nombre = data.nombre
      user.email = data.email
      user.password = data.password
      user.estado = data.estado
      user.foto = data.foto
      user.rol_id = data.rol_id
      user.save()
      return response.json(user);
    } else {
      return response.badRequest({ message: "No existe un usuario"});
    }
  }


  async destroy({ params,response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    if (user) {
      user.delete();
      return response.json({message:"Usuario eliminado!"});
    } else {
      return response.badRequest({ message: "No existe un usuario"});
    }
  }
}

*/



import Person from '#models/person';
import type { HttpContext } from '@adonisjs/core/http'

export default class PersonController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const data = await Person.all();
    return response.json(data);
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,response }: HttpContext) {
    const data = request.only(['name','dpi']);
    const existe = await Person.query().where('dpi', data.dpi).first();
    if (!existe) {
      const user = await Person.create(data);
      return response.created(user);
    } else {
      return response.badRequest({ message: "Ya existe" + data.name });
    }
  }

  /**
   * Show individual record
   */
  async show({ params,response }: HttpContext) {
    const data = await Person.findOrFail(params.id);
    return response.json(data);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request,response }: HttpContext) {
    const model = await Person.findOrFail(params.id);
    if (model) {
      const data = request.only(['name','dpi']);
      model.name = data.name
      model.dpi = data.dpi
     
      model.save()
      return response.json(model);
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {
    const model = await Person.findOrFail(params.id);
    if (model) {
      model.delete();
      return response.json({message:"eliminado!"});
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }
}



/*
import Person from '#models/person';
import type { HttpContext } from '@adonisjs/core/http'

export default class PersonController {
 
  async index({ response }: HttpContext) {
    const data = await Person.all();
    return response.json(data);
  }

  
  async store({ request,response }: HttpContext) {
    const data = request.only(['name','dpi']);
    const existe = await Person.query().where('dpi', data.dpi).first();
    if (!existe) {
      const user = await Person.create(data);
      return response.created(user);
    } else {
      return response.badRequest({ message: "Ya existe" + data.name });
    }
  }

  
  async show({ params,response }: HttpContext) {
    const data = await Person.findOrFail(params.id);
    return response.json(data);
  }

  
  async update({ params, request,response }: HttpContext) {
    const model = await Person.findOrFail(params.id);
    if (model) {
      const data = request.only(['name','dpi']);
      model.name = data.name
      model.dpi = data.dpi
     
      model.save()
      return response.json(model);
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }

 
  async destroy({ params,response }: HttpContext) {
    const model = await Person.findOrFail(params.id);
    if (model) {
      model.delete();
      return response.json({message:"eliminado!"});
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }
}

*/




/*
import Person from '#models/person';
import type { HttpContext } from '@adonisjs/core/http'

export default class PersonController {

  async index({ response }: HttpContext) {
    const data = await Person.all();
    return response.json(data);
  }


  async store({ request,response }: HttpContext) {
    const data = request.only(['name','dpi']);
    const existe = await Person.query().where('dpi', data.dpi).first();
    if (!existe) {
      const user = await Person.create(data);
      return response.created(user);
    } else {
      return response.badRequest({ message: "Ya existe" + data.name });
    }
  }


  async show({ params,response }: HttpContext) {
    const data = await Person.findOrFail(params.id);
    return response.json(data);
  }

  async update({ params, request,response }: HttpContext) {
    const model = await Person.findOrFail(params.id);
    if (model) {
      const data = request.only(['name','dpi']);
      model.name = data.name
      model.dpi = data.dpi
     
      model.save()
      return response.json(model);
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }

  
  async destroy({ params,response }: HttpContext) {
    const model = await Person.findOrFail(params.id);
    if (model) {
      model.delete();
      return response.json({message:"eliminado!"});
    } else {
      return response.badRequest({ message: "No existe"});
    }
  }


}

*/


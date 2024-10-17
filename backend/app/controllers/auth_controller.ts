import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import ElasticEmail  from '@elasticemail/elasticemail-client';

export default class AuthController {
 
  /**
   * Handle form submission for the create action
   */
  async register({ request, response }: HttpContext) {
    try {
      const data = request.only(['nombre', 'email', 'password', 'rol_id']);
      const existe = await User.query().where('email', data.email).first();
      if (!existe) {
        const user = await User.create(data);
        const token = await User.accessTokens.create(user);
        
        return {
          type: 'Bearer',
          token:token.value!.release()
        };
      } else {
        return response.badRequest({ message: "Ya existe un usuario con correo:" + data.email });
      }
    } catch (err) {
      console.log(err)
      return response.badRequest({ message: "Intente más tarde" });
    }
    
  }

  /*
  async login({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password']);
      
        const user = await User.verifyCredentials(data.email,data.password)
      if (user.estado === "ACTIVO") {
        const token = await User.accessTokens.create(user);
        const userInfo = await User.query().where('id',user.id)
        .preload('rol').first() // Cargar la relación 'rol'

       

        //inicio para borrar
        const codigo = Math.floor(100000 + Math.random() * 900000)
          let defaultClient = ElasticEmail.ApiClient.instance;
          
          let apikey = defaultClient.authentications['apikey'];
          apikey.apiKey = "41006D4372FBA2880E75C34AD0D672FB595C7C20E8FCAB7A65DB678AEBA649B6EE0EA9110F18C9AA95D71964CB064372"
          
          let api = new ElasticEmail.EmailsApi()
          
          let email = ElasticEmail.EmailMessageData.constructFromObject({
            Recipients: [
              new ElasticEmail.EmailRecipient("lornaajuarez@gmail.com")
            ],
            Content: {
              Body: [
                ElasticEmail.BodyPart.constructFromObject({
                  ContentType: "HTML",
                  Content: `<strong>${codigo}</strong> es su código de verificación`
                })
              ],
              Subject: "OTP RIC",
              From: "lornaajuarez@gmail.com"
            }
          });
          
          
          api.emailsPost(email, function(error, data, response) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email enviado.');
            }
          });
        
          return {
            type: 'Bearer',
            codigo,
            token: token.value!.release(),
            user: userInfo
          };
        
        //fin para brrar
      }
      return response.unauthorized({message:"Usuario inactivo"});
      
      
    } catch (err) {
      console.log(err)
      return response.unauthorized();
    }
    
  }
  */

  async login({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password']);
      
        const user = await User.verifyCredentials(data.email,data.password)
      if (user.estado === "ACTIVO") {
        const token = await User.accessTokens.create(user);
        const userInfo = await User.query().where('id',user.id)
        .preload('rol').first() // Cargar la relación 'rol'

       

        //inicio para borrar
        const codigo = Math.floor(100000 + Math.random() * 900000)
          let defaultClient = ElasticEmail.ApiClient.instance;
          
          let apikey = defaultClient.authentications['apikey'];
          apikey.apiKey = "41006D4372FBA2880E75C34AD0D672FB595C7C20E8FCAB7A65DB678AEBA649B6EE0EA9110F18C9AA95D71964CB064372"
          
          let api = new ElasticEmail.EmailsApi()
          
          let email = ElasticEmail.EmailMessageData.constructFromObject({
            Recipients: [
              new ElasticEmail.EmailRecipient(data.email)
            ],
            Content: {
              Body: [
                ElasticEmail.BodyPart.constructFromObject({
                  ContentType: "HTML",
                  Content: `<strong>${codigo}</strong> es su código de verificación`
                })
              ],
              Subject: "OTP RIC",
              From: "lornaajuarez@gmail.com"
            }
          });
          
          
          api.emailsPost(email, function(error, data, response) {
            if (error) {
              console.error(error);
            } else {
              console.log('Email enviado.');
            }
          });
        
          return {
            type: 'Bearer',
            codigo,
            token: token.value!.release(),
            user: userInfo
          };
        
        //fin para brrar
      }
      return response.unauthorized({message:"Usuario inactivo"});
      
      
    } catch (err) {
      console.log(err)
      return response.unauthorized();
    }
    
  }

 



  async logout({ auth, response }: HttpContext) {
    try {
      const userId = await auth.user?.id;
      const user = await User.findOrFail(userId)
      await User.accessTokens.delete(user,user.id)
      return response.ok({
        success: true,
        message:"Logout ok"
      });
      
    } catch (err) {
      return response.unauthorized();
    }
    
  }

  async me({ auth, response }: HttpContext) {
    try {
      
      await auth.authenticate();
      const userAuth = await auth.getUserOrFail();
      const userInfo = await User.query().where('id',userAuth.id)
        .preload('rol') // Cargar la relación 'rol'
        .exec()
      return response.json(userInfo);
      
    } catch (err) {
      return response.unauthorized('Usuario no autorizado');
    }
    
  }

  
}
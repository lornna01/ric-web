/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller';
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';
import AuthController from '#controllers/auth_controller';
import RolController from '#controllers/rol_controller';
import EstadoExpedientesController from '#controllers/estado_expedientes_controller';
import ExpedientesController from '#controllers/expedientes_controller';
import DepartamentosController from '#controllers/departamentos_controller';
import MunicipiosController from '#controllers/municipios_controller';
import MovimientoExpedientesController from '#controllers/movimiento_expedientes_controller';
import VehiculosController from '#controllers/vehiculos_controller';
import ElasticEmail  from '@elasticemail/elasticemail-client';
import CombustiblesController from '#controllers/combustibles_controller';
import BoletasController from '#controllers/boletas_controller';
import NotificacionesController from '#controllers/notificaciones_controller';
import PersonController from '#controllers/persona_controller';

//import Route from '@ioc:Adonis/Core/Route';


router.get('/', async () => {
  
  return {
    hello: 'world',
  }
})


router.group(() => {

  router.group(() => {
    router.resource('usuarios', UsersController);
    router.resource('personas', PersonController);
    router.resource('roles', RolController);
    router.resource('estadoExpedientes', EstadoExpedientesController);
    router.resource('expedientes', ExpedientesController);
    router.resource('departamentos', DepartamentosController);
    router.resource('municipios', MunicipiosController);
    router.resource('movimientos', MovimientoExpedientesController);
    router.resource('vehiculos', VehiculosController);
    router.resource('combustibles', CombustiblesController);
    router.resource('boletas', BoletasController);
    router.resource('notificaciones', NotificacionesController);

    /*    
    Route.get('/roles', 'RolController.index')
    Route.post('/roles', 'RolController.store')
    Route.post('/roles/:id/update', 'RolController.update')
    Route.post('/roles/:id/toggle-status', 'RolController.toggleStatus')
    */

//    router.get('rolesByNombre/:nombre', [RolController,'showByNombreRol']);
//    router.get('departamentosByNombre/:nombre', [DepartamentosController,'showByNombreDep']);
//    router.get('municipiosByNombre/:nombre', [MunicipiosController,'showByNombreMun']);
    
    router.get('vehiculosByPlaca/:placa', [VehiculosController,'showByPlaca']);

    router.get('boletaBySerie/:serie', [BoletasController,'showBySerie']);

    router.post('expedientes/reporteExpediente', [ExpedientesController,'reporteExpediente']);
    router.get('expedientes/reporteExpediente', [ExpedientesController,'reporteExpediente']);


    router.post('combustible/reporteCombustible', [CombustiblesController,'reporteCombustible']);
    router.get('combustible/reporteCombustible', [CombustiblesController,'reporteCombustible']);

    

    //router.get('/expedientes-por-usuario', 'ExpedientesPorUsuarioController.index');

    router.get('me', [AuthController,'me']);
    router.get('logout', [AuthController,'logout']);
  }).use(
    middleware.auth({
      guards:['api'],
    })
  );
 
  router.group(() => {
    router.post('login', [AuthController,'login']);
    router.post('register', [AuthController,'register']);
  }).prefix('/auth');
  

}).prefix('/api/v1');


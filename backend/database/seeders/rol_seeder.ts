import Rol from "#models/rol";
import { BaseSeeder } from "@adonisjs/lucid/seeders";


export default class RoleSeeder extends BaseSeeder {
  public async run () {
    await Rol.createMany([
      {
        nombre: 'ADMINISTRADOR',
        descripcion: 'Rol de administrador con todos los permisos',
      },
      {
        nombre: 'ARCHIVOS',
        descripcion: 'Rol para gestionar archivos',
      },
      {
        nombre: 'ADMINISTRACION',
        descripcion: 'Rol para tareas de administración',
      }
    ])
  }
}

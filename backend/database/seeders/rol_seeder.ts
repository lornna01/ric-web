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
        nombre: 'TECNICO-ARCHIVO',
        descripcion: 'Rol para gestionar archivos',
      },
      {
        nombre: 'ASISTENTE-ADMINISTRATIVO',
        descripcion: 'Rol para tareas de administración',
      },
      {
        nombre: 'GERENTE',
        descripcion: 'Rol para el Director Municipal',
      }
    ])
  }
}

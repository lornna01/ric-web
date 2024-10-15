import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Boleta extends BaseModel {
  static table = 'boletas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fecha: DateTime
  
  @column()
  declare pais: string
  
  @column()
  declare departamento: string
  
  @column()
  declare genero: string
  
  @column()
  declare edad: string
  
  @column()
  declare motivo: string
  
  @column()
  declare actividad: string
  
  @column()
  declare entero: string
  
  @column()
  declare viaja: string

  @column()
  declare correo: string
  
  @column()
  declare serie: number

  @column()
  declare usuario_id: number
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Vehiculo extends BaseModel {
  static table = 'vehiculos'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare propietario: string
  
  @column()
  declare placa: string
  
  @column()
  declare modelo: string
  
  @column()
  declare chofer: string
  
  @column()
  declare foto: string

  @column()
  declare comentarios: string
  
  @column()
  declare usuario_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
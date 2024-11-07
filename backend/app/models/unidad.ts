import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'




export default class Unidad extends BaseModel {
  
  static table = 'unidades'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


}
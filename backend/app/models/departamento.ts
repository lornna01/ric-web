import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Departamento extends BaseModel {
  static table = 'departamentos'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare estado: string
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


}
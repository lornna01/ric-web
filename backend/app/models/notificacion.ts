import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Notificacion extends BaseModel {
  static table = 'notificaciones'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare mensaje: string
  
  @column()
  declare visto: boolean

  @column()
  declare usuario_id: number
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
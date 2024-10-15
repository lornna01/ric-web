import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Expediente from './expediente.js'

export default class MovimientoExpediente extends BaseModel {
 
  static table = 'movimiento_expediente' // Corregido a 'movimiento_expediente'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare archivo: string

  @belongsTo(() => User, {
    foreignKey: 'usuario_id',
  })
  declare usuario: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'usuario_destino_id',
  })
  declare usuario_destino: BelongsTo<typeof User>

  @belongsTo(() => Expediente, {
    foreignKey: 'expediente_id',
  })
  declare expediente: BelongsTo<typeof Expediente>

  @column.dateTime({ autoCreate: true })
  declare fecha_salida: DateTime

  @column()
  declare fecha_limite: DateTime

  @column.dateTime({ autoCreate: true })
  declare fecha_entrega: DateTime

  @column()
  declare usuario_id: number

  @column()
  declare usuario_destino_id: number

  @column()
  declare expediente_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Combustible extends BaseModel {
  static table = 'combustible'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fecha: DateTime
  
  @column()
  declare placa: string
  
  @column()
  declare kilometraje_inicial: number
  
  @column()
  declare kilometraje_final: number
  
  @column()
  declare chofer: string
  
  @column()
  declare cupon_desde: number
  
  @column()
  declare cupon_hasta: number
  
  @column()
  declare denominacion: number
  
  @column()
  declare estado_cupon: string
  
  @column()
  declare pdf: string

  @column()
  declare observacion_cupon: string
  
  @column()
  declare usuario_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
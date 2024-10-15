import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import EstadoExpediente from './estado_expediente.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Departamento from './departamento.js'
import Municipio from './municipio.js'
import User from './user.js'

export default class Expediente extends BaseModel {

  static table = 'expedientes'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare poligono: string

  @column()
  declare predio: string

  @column()
  declare estanteria: string

  @column()
  declare nivel: number

  @column()
  declare hojas: number
  
  @column()
  declare leitz: string

  @column()
  declare titular: string
  
  @column()
  declare comentarios: string
  
  @column()
  declare archivo: string

  @belongsTo(() => EstadoExpediente, {
    foreignKey: 'expediente_estado_id',
  })
  declare estado: BelongsTo<typeof EstadoExpediente>

  @belongsTo(() => Departamento, {
    foreignKey: 'departamento_id',
  })
  declare departamento: BelongsTo<typeof Departamento>

  @belongsTo(() => Municipio, {
    foreignKey: 'municipio_id',
  })
  declare municipio: BelongsTo<typeof Municipio>

  @belongsTo(() => User, {
    foreignKey: 'usuario_id',
  })
  declare usuario: BelongsTo<typeof User>

  @column()
  declare expediente_estado_id: number 

  @column()
  declare departamento_id: number 

  @column()
  declare usuario_id: number 

  @column()
  declare municipio_id: number 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
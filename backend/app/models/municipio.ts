import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Departamento from './departamento.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'


export default class Municipio extends BaseModel {
  static table = 'municipios'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @belongsTo(() => Departamento, {
    foreignKey: 'departamento_id',
  })
  declare departamento: BelongsTo<typeof Departamento>

  @column()
  declare departamento_id: number 


  @column()
  declare estado: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

} 
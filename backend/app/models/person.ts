import { unique } from '@adonisjs/lucid/utils';
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'




export default class Person extends BaseModel {
  
  static table = 'persona'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare dpi: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null


}


/*
// Funciona ultima modificacion 08/10/2024 8 pm
import { unique } from '@adonisjs/lucid/utils';
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'


export default class Person extends BaseModel {
  
  static table = 'persona'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare dpi: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

}

*/




/*
import { unique } from '@adonisjs/lucid/utils';
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'




export default class Person extends BaseModel {
  
  static table = 'persona'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare dpi: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null


}
*/

import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Rol from '#models/rol';
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string | null

  @column()
  declare foto: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @belongsTo(() => Rol, {
    foreignKey: 'rol_id',
  })
  declare rol: BelongsTo<typeof Rol>

  @column()
  declare estado: string

  @column()
  declare rol_id: number 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 days',
    prefix: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 100,
  })
  dpi: any
}


/*
 //Ultima modificacion 08/10/2024 8 pm
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Rol from '#models/rol';
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string | null

  @column()
  declare foto: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @belongsTo(() => Rol, {
    foreignKey: 'rol_id',
  })
  declare rol: BelongsTo<typeof Rol>

  @column()
  declare estado: string
 
  @column()
  declare rol_id: number 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 days',
    prefix: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 100,
  })
}
*/


/*
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Rol from '#models/rol';
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string | null

  @column()
  declare foto: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @belongsTo(() => Rol, {
    foreignKey: 'rol_id',
  })
  declare rol: BelongsTo<typeof Rol>

  @column()
  declare estado: string

  @column()
  declare rol_id: number 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 days',
    prefix: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 100,
  })
}
  */



import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expedientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('poligono').notNullable()
      table.string('predio').notNullable()
      table.string('estanteria').notNullable()
      table.string('titular').notNullable()
      table.integer('nivel').notNullable()
      table.integer('hojas').notNullable() // Foreign key reference
      table.string('leitz').notNullable()// Foreign key reference
      table.string('comentarios').notNullable() // Foreign key reference
      table.integer('municipio_id').unsigned().defaultTo(null)
        .references('id').inTable('municipios').onDelete('CASCADE')
      table.integer('departamento_id').unsigned().defaultTo(null)
        .references('id').inTable('departamentos').onDelete('CASCADE')
      table.integer('expediente_estado_id').unsigned().defaultTo(null)
        .references('id').inTable('estado_expedientes').onDelete('CASCADE')
        table.integer('usuario_id').unsigned().defaultTo(null)
          .references('id').inTable('users').onDelete('CASCADE')
          table.unique(['predio', 'departamento_id', 'municipio_id', 'predio', 'poligono'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
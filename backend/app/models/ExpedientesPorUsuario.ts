const { BaseModel } = require('@ioc:Adonis/Lucid/Orm')


class ExpedientesPorUsuario extends BaseModel {
    static get table() {
      return 'expedientes_por_usuario'
    }
  
    static get primaryKey() {
      return null  // Las vistas generalmente no tienen una clave primaria
    }
  
    static get incrementing() {
      return false
    }
  }
  
  module.exports = ExpedientesPorUsuario
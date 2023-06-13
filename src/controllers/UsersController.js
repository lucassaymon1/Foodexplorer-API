const AppError = require("../utils/AppError")

class UsersController{

  /*
   - Máximo 5 métodos por Controller

   * index: mostra todos os dados; - GET
   * show: mostra um dado específico; - GET
   * create: cria um dado; - POST
   * update: atualiza um dado existente; - PUT
   * delete: deleta um dado existente; - DELETE
  */

  create(req, res){
    const {name, email, password} = req.body

    if(!name){ 
      throw new AppError("O nome do usuário é obrigatório!")
    }

    res.status(201).json({name, email, password})
  }
}

module.exports = UsersController
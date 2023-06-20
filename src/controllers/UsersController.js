const AppError = require("../utils/AppError")
const {hash, compare} = require("bcrypt")
// require database connection
const knex = require("../database/knex")

class UsersController{

  /*
   - Máximo 5 métodos por Controller

   * index: mostra todos os dados; - GET
   * show: mostra um dado específico; - GET
   * create: cria um dado; - POST
   * update: atualiza um dado existente; - PUT
   * delete: deleta um dado existente; - DELETE
  */

  async create(req, res){
    const {name, email, password, isAdmin} = req.body

    if(!name){ 
      throw new AppError("O nome do usuário é obrigatório!")
    }

    // email verification

    
    const emailStructure = /\S+@\S+\.\S+/
    const emailValidation = emailStructure.test(email)

    if(!emailValidation){
      throw new AppError("Digite um email válido!")
    }

    const emailExists = await knex("users").where({email}).first()
    
    if(emailExists){
      throw new AppError("Este email já está sendo utilizado.")
    }


    // hashing password

    const hashedPassword = await hash(password, 8)

    const createUser = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      isAdmin
    })

    res.status(201).json({name, email, password})
  }

  async show(req, res){
    const {id} = req.params

    const user = await knex("users").where({id}).first()
    if(!user){
      throw new AppError("Usuário não existe")
    }

    res.json({
      id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin === 1 ? true : false
    })
  }
}

module.exports = UsersController
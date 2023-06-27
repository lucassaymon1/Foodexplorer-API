const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class FoodsPictureController{

  async update(req, res){
    const avatarFilename = req.file.filename
    const user_id = req.user.id
    const {id} = req.params

    const diskStorage = new DiskStorage

    const user = await knex("users").where({id: user_id}).first()
    const food  = await knex("foods").where({id}).first()

    if(!user){
      throw new AppError("O usuário precisa estar autenticado para atualizar a imagem de um prato", 401)
    }

    if(food.picture){
      await diskStorage.deleteFile(food.picture)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    food.picture = filename

    await knex("users").update(food).where({id})

    return res.json(food)

  }
}

module.exports = FoodsPictureController

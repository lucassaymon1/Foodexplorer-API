const knex = require("../database/knex")

class TagsController{
  async index(req, res){
    const {user_id} = req.query

    const tags = await knex("tags").where({user_id}).first()
    res.json({...tags})
  }
}

module.exports = TagsController
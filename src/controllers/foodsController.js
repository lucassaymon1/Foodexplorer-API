const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class FoodsController{

  // show all user foods

  async index(req, res){
    const {user_id} = req.query

    const userFoods = await knex("foods").where({user_id})

    return res.json({...userFoods})

  }

  // show a single user food


  async show(req, res){
    const {id} = req.query

    const food = await knex("foods").where({id}).first()


    return res.json({...food})
  }

  // create food zone

  async create(req, res){
    const {name, price, description} = req.body
    const {user_id} = req.params

    if(!name){
      throw new AppError("Digite um título para o prato.")
    }

    if(!price){
      throw new AppError("Digite um preço para o prato.")
      
    }

    const food_id = await knex("foods").insert({
      name,
      price: parseFloat(price),
      description,
      user_id
    })

    res.status(201).json({name, price, description, user_id})

  }

  // update an existent food

  async update(req, res){
    const {id, user_id,} = req.query
    const {name, price, description, tags} = req.body

    const updateFood = await knex("foods").where({user_id: id}).first()
    const updateTags = tags.map(name => {
      return{
        name,
        user_id,
        food_id: id
      }
    })

    food.name = name ?? food.name
    food.description = description ?? food.description
    food.price = price ?? food.price


    await knex("foods").update(updateFood).where({id})
    await knex("tags").where({food_id: id}).delete()
    await knex("tags").insert(updateTags).where({food_id: id})

    return res.json({
      ...updateFood,
      ...updateTags
    })

  }

  // delete an existent food

  async delete(req, res){
    const {id} = req.params

    await knex("foods").where({id}).delete()

    return res.json()

  }

}

module.exports = FoodsController
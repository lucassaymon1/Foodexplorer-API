const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class FoodsController{

  // show all user foods

  async index(req, res){
    const {user_id, title, tags} = req.query

    let foods

    if (tags){
      const filterTags = tags.split(",").map(tag => tag.trim())

      foods = await knex("tags")
      .join("foods")
      .select([
        "foods.id",
        "foods.name",
        "foods.user_id",
        "foods.description",
        "foods.price",
        "foods.picture"
      ])
      .where("foods.user_id", user_id)
      .whereLike("foods.name", `%${title}%`)
      .whereIn("tags.name", filterTags)
      .groupBy("foods.id")
      .orderBy("foods.name")
    }

    else{
      foods = await knex("foods")
      .where({user_id})
      .whereLike("foods.name", `%${title}%`)
      .orderBy("food.name")
    }

    const userTags = await knex("tags").where({user_id})
    const foodsWithTags = foods.map(food => {
      const foodTags = userTags.filter(tag => tag.food_id === food.id)
      return({
        ...food,
        tags: foodTags
      })
    })

    return res.json(foodsWithTags)

  }

  // show a single user food


  async show(req, res){
    const {id} = req.query

    const food = await knex("foods").where({id}).first()


    return res.json({...food})
  }

  // create food zone

  async create(req, res){
    const {name, price, description, tags} = req.body
    const {user_id} = req.query

    if(!name){
      throw new AppError("Digite um título para o prato.")
    }

    if(!price){
      throw new AppError("Digite um preço para o prato.")
      
    }

    
    
    const [food_id] = await knex("foods").insert({
      name,
      price: parseFloat(price),
      description,
      user_id
    })
    
    if(tags){

      const insertTags = tags.map(tag => {
        return{
          name: tag,
          user_id,
          food_id
        }
      })
      await knex("tags").insert(insertTags)
      const foodsWithTags = {
        name,
        price,
        description,
        user_id,
        tags: insertTags
      }
    }



    res.status(201).json()

  }

  // update an existent food

  async update(req, res){
    const {id, user_id} = req.query
    const {name, price, description, tags} = req.body
    console.log(name)
    const loadTags = await knex("tags").where({food_id: id})
    console.log(loadTags)
    
    const currentTags = loadTags.map(tag => {
      return tag.name
    })

    console.log("tags enviadas:", tags)
    console.log("currentTags:", currentTags)

    const newTags = tags.filter(tag => !currentTags.includes(tag))
    console.log("newTags:", newTags)
    const obsoleteTags = currentTags.filter(tag => !tags.includes(tag))
    console.log("obsoleteTags:", obsoleteTags)

    const tagsInsert = newTags.map( name => {
      return{
        name,
        user_id,
        food_id: id
      }
    })
    

    const updatedFood = await knex("foods").where({id}).first()
    
    // adicionar tratamento de tags - melhorar o fornecimento, mostrar em ordem alfabética, configurar para tags não se repetirem
    // fazer com que tags não sejam excluidas de todas os pratos caso sejam atualizadas
    updatedFood.name = name ?? updatedFood.name
    updatedFood.description = description ?? updatedFood.description
    updatedFood.price = price ?? updatedFood.price
    console.log(updatedFood.updated_at)
    
    
    await knex("foods").update(updatedFood).where({id})

    if(obsoleteTags.length >= 1){
      await knex("tags").where({food_id: id}).whereIn("name", obsoleteTags).delete()
    }

    if(newTags.length >= 1){
      await knex("tags").insert(tagsInsert)
    }
    const updatedTags = await knex("tags").where({food_id: id})
    
    console.log("afterUpdate: ", updatedTags)

    return res.json({
      ...updatedFood,
      ...updatedTags
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
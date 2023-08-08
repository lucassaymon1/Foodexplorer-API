const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class FoodsController {
	// show all user foods

	// async index(req, res){
	//   const {user_id, title, tags} = req.query

	//   let foods

	//   if (tags){
	//     const filterTags = tags.split(",").map(tag => tag.trim())

	//     foods = await knex("tags")
	//     .join("foods")
	//     .select([
	//       "foods.id",
	//       "foods.name",
	//       "foods.user_id",
	//       "foods.description",
	//       "foods.price",
	//       "foods.picture"
	//     ])
	//     .where("foods.user_id", user_id)
	//     .whereLike("foods.name", `%${title}%`)
	//     .whereIn("tags.name", filterTags)
	//     .groupBy("foods.id")
	//     .orderBy("foods.name")
	//   }

	//   else{
	//     foods = await knex("foods")
	//     .where({user_id})
	//     .whereLike("foods.name", `%${title}%`)
	//     .orderBy("food.name")
	//   }

	//   const userTags = await knex("tags").where({user_id})
	//   const foodsWithTags = foods.map(food => {
	//     const foodTags = userTags.filter(tag => tag.food_id === food.id)
	//     return({
	//       ...food,
	//       tags: foodTags
	//     })
	//   })

	//   return res.json(foodsWithTags)

	// }

	// show a single user food

	async index(req, res) {
		const user_id = req.user.id
		const { search } = req.query

		if (!user_id) {
			throw new AppError('usuário não autorizado.')
		}
		const foods = await knex('foods').whereLike('foods.name', `%${search}%`)

		// const tagsByName = await knex("tags").whereLike('name', `%${search}%`)

		// const foodsByTags = await knex("foods").where({id: tagsByName.map(tag => tag.food_id)}).groupBy({id})

		// const foods =

		return res.json(foods)
	}

	//show a single user food

	async show(req, res) {
		const { id } = req.params
		const user_id = req.user.id

		if (!user_id) {
			throw new AppError('usuário não autorizado.')
		}
		const food = await knex('foods').where({ id }).first()
		const foodTags = await knex('tags').where({ food_id: id }).orderBy('name')

		return res.json({
			...food,
			tags: foodTags
		})
	}

	// create food zone

	async create(req, res) {
		const { name, price, description, category, formTags } = req.body
		const user_id = req.user.id
		const pictureFilename = req.file.filename
		const tags = formTags.split(',')

		console.log(tags)

		const diskStorage = new DiskStorage()

		const filename = await diskStorage.saveFile(pictureFilename)

		if (!name) {
			throw new AppError('Digite um título para o prato.')
		}

		if (!price) {
			throw new AppError('Digite um preço para o prato.')
		}

		if (!category) {
			throw new AppError('Selecione uma categoria para o prato.')
		}

		const [food_id] = await knex('foods').insert({
			name,
			price: parseFloat(price),
			category,
			description,
			user_id,
			picture: filename
		})

		if (tags) {
			const insertTags = tags.map((tag) => {
				return {
					name: tag,
					user_id,
					food_id
				}
			})
			await knex('tags').insert(insertTags)
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

	async update(req, res) {
		const { id } = req.params
		const user_id = req.user.id
		const { name, price, description, category, tags } = req.body

		if (tags) {
			const loadTags = await knex('tags').where({ food_id: id })

			const currentTags = loadTags.map((tag) => {
				return tag.name
			})

			const newTags = tags.filter((tag) => !currentTags.includes(tag))
			const obsoleteTags = currentTags.filter((tag) => !tags.includes(tag))

			const tagsInsert = newTags.map((name) => {
				return {
					name,
					user_id,
					food_id: id
				}
			})

			if (obsoleteTags.length >= 1) {
				await knex('tags')
					.where({ food_id: id })
					.whereIn('name', obsoleteTags)
					.delete()
			}

			if (newTags.length >= 1) {
				await knex('tags').insert(tagsInsert)
			}
			const updatedTags = await knex('tags').where({ food_id: id })
		}

		const updatedFood = await knex('foods').where({ id }).first()

		// adicionar tratamento de tags - melhorar o fornecimento, mostrar em ordem alfabética, configurar para tags não se repetirem
		// fazer com que tags não sejam excluidas de todas os pratos caso sejam atualizadas
		updatedFood.name = name ?? updatedFood.name
		updatedFood.description = description ?? updatedFood.description
		updatedFood.price = price ?? updatedFood.price
		updatedFood.category = category ?? updatedFood.category

		await knex('foods').update(updatedFood).where({ id })

		return res.json({
			...updatedFood
			// ...updatedTags
		})
	}

	// delete an existent food

	async delete(req, res) {
		const { id } = req.params
		const diskStorage = new DiskStorage()

		const food = await knex('foods').where({ id }).first()
		await diskStorage.deleteFile(food.picture)

		await knex('foods').where({ id }).delete()

		return res.json()
	}
}

module.exports = FoodsController

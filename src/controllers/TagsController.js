const knex = require('../database/knex')

class TagsController {
	async index(req, res) {
		const { food_id } = req.query

		const tags = await knex('tags').where({ food_id }).first()
		res.json({ ...tags })
	}
}

module.exports = TagsController

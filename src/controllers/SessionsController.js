const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')
const authConfig = require('../configs/auth')
const { sign, verify } = require('jsonwebtoken')

class SessionsController {
	async show(req, res) {
		const user_id = req.user.id

		if (!user_id) {
			return res.json({
				status: 401,
				message: 'jwt token expirado.'
			})
		}
		return res.json(user_id)
	}

	async create(req, res) {
		const { email, password } = req.body

		const user = await knex('users').where({ email }).first()

		if (!user) {
			throw new AppError('Email ou senha inválidos!')
		}
		const passwordMatched = await compare(password, user.password)

		if (!passwordMatched) {
			throw new AppError('Email ou senha inválidos!')
		}

		const { secret, expiresIn } = authConfig.jwt
		const token = sign({}, secret, {
			subject: String(user.id),
			expiresIn
		})
		return res.json({ user, token })
	}
}

module.exports = SessionsController

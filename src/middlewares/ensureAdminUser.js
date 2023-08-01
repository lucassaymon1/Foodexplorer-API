const AppError = require('../utils/AppError')
const knex = require('../database/knex')
const { verify } = require('jsonwebtoken')
const authConfig = require('../configs/auth')

async function ensureAdminUser(req, res, next) {
	const authHeader = req.headers.authorization
	const [, token] = authHeader.split(' ')

	const { sub: user_id } = verify(token, authConfig.jwt.secret)

	const user = await knex('users').where({ id: user_id }).first()

	if (!user || user.isAdmin !== 1) {
		throw new AppError('Usuário não autorizado.')
	}

	return next()
}

module.exports = ensureAdminUser

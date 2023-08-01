const { Router } = require('express')
const SessionsController = require('../controllers/SessionsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const sessionsController = new SessionsController()
const sessionsRoutes = Router()

sessionsRoutes.post('/', sessionsController.create)
sessionsRoutes.get('/', ensureAuthenticated, sessionsController.show)

module.exports = sessionsRoutes

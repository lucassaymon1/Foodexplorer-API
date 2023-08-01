const { Router } = require('express')
const FoodsController = require('../controllers/FoodsController')
const FoodsPictureController = require('../controllers/FoodsPictureController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureAdminUser = require('../middlewares/ensureAdminUser')

const multer = require('multer')
const uploadConfig = require('../configs/uploads')

const foodsController = new FoodsController()
const foodsPictureController = new FoodsPictureController()

const foodsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get('/:id', foodsController.show)
foodsRoutes.get('/', foodsController.index)
foodsRoutes.post(
	'/',
	ensureAdminUser,
	upload.single('picture'),
	foodsController.create
)
foodsRoutes.put('/:id', ensureAdminUser, foodsController.update)
foodsRoutes.delete('/:id', ensureAdminUser, foodsController.delete)
foodsRoutes.patch(
	'/picture/:id',
	ensureAdminUser,
	upload.single('picture'),
	foodsPictureController.update
)

module.exports = foodsRoutes

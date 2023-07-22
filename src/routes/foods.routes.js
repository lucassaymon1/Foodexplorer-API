const { Router } = require('express')
const FoodsController = require('../controllers/FoodsController')
const FoodsPictureController = require('../controllers/FoodsPictureController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const multer = require('multer')
const uploadConfig = require('../configs/uploads')

const foodsController = new FoodsController()
const foodsPictureController = new FoodsPictureController()

const foodsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get('/:id', foodsController.show)
foodsRoutes.get('/', foodsController.index)
foodsRoutes.post('/', upload.single('picture'), foodsController.create)
foodsRoutes.put('/:id', foodsController.update)
foodsRoutes.delete('/:id', foodsController.delete)
foodsRoutes.patch(
	'/picture/:id',
	upload.single('picture'),
	foodsPictureController.update
)

module.exports = foodsRoutes

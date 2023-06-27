const {Router} = require("express")
const FoodsController = require("../controllers/FoodsController")
const FoodsPictureController = require("../controllers/FoodsPictureController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const foodsController = new FoodsController
const foodsPictureController = new FoodsPictureController

const foodsRoutes = Router()

foodsRoutes.use(ensureAuthenticated)

foodsRoutes.get("/:id", foodsController.show)
foodsRoutes.get("/", foodsController.index)
foodsRoutes.post("/", foodsController.create)
foodsRoutes.put("/:id", foodsController.update)
foodsRoutes.delete("/:id", foodsController.delete)
foodsRoutes.patch("/:id", foodsPictureController.update)

module.exports = foodsRoutes
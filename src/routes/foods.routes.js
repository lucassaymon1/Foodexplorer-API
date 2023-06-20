const {Router} = require("express")
const FoodsController = require("../controllers/foodsController")

const foodsController = new FoodsController
const foodsRoutes = Router()

foodsRoutes.get("/:id", foodsController.show)
foodsRoutes.get("/", foodsController.index)
foodsRoutes.post("/", foodsController.create)
foodsRoutes.put("/:id", foodsController.update)
foodsRoutes.delete("/:id", foodsController.delete)

module.exports = foodsRoutes
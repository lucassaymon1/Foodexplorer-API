const {Router} = require("express")
const UsersController = require("../controllers/UsersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersController = new UsersController()

const usersRoutes = Router()

// usersRoutes.get("/pages", (req, res) => {
//   const {page_id, category} = req.query

//   res.send(`Página: ${page_id}; Categoria: ${category}`)
// })


usersRoutes.post("/", usersController.create)
usersRoutes.get("/:id", ensureAuthenticated, usersController.show)

module.exports = usersRoutes


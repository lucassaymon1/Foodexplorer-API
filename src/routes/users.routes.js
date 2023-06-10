const {Router} = require("express")

const usersRoutes = Router()

// usersRoutes.get("/pages", (req, res) => {
//   const {page_id, category} = req.query

//   res.send(`Página: ${page_id}; Categoria: ${category}`)
// })

usersRoutes.post("/", (req, res) => {
const {name, email, password} = req.body
res.json({name, email, password})
})

module.exports = usersRoutes


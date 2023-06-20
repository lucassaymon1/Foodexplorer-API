const {Router} = require("express")
const TagsController = require("../controllers/TagsController")

const tagsController = new TagsController
const tagsRoutes = Router()


tagsRoutes.get("/", tagsController.index)

module.exports = tagsRoutes


require("express-async-errors")

const express = require("express")
const routes = require("./routes")
const AppError = require("./utils/AppError")
const database = require("./database/sqlite")

const app = express()
const PORT = 3333

app.use(express.json())
app.use(routes)

database()

app.use(( error, req, res, next) => {
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error)

  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
})

// app.get("/:username", (req, res) => {
//   const {username} = req.params
//   res.send(`Hello, world! my name is ${username}`)
// })


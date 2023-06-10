const express = require("express")
const routes = require("./routes")

const app = express()
const PORT = 3333

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
})

// app.get("/:username", (req, res) => {
//   const {username} = req.params
//   res.send(`Hello, world! my name is ${username}`)
// })


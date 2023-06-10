const express = require("express")

const app = express()
const PORT = 3333


app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
})

app.get("/", (req, res) => {
  res.send("hello, world!")
})
require('express-async-errors')
require('dotenv/config')

const express = require('express')
const routes = require('./routes')
const AppError = require('./utils/AppError')
const database = require('./database/sqlite')

const uploadsConfig = require('../src/configs/uploads')

const cors = require('cors')

const app = express()
app.use(
	cors({
		origin: 'https://foodexplorer-vacherin-303ff0.netlify.app'
	})
)

const PORT = 10000

app.use(express.json())
app.use(routes)

app.use('/files', express.static(uploadsConfig.UPLOADS_FOLDER))

database()

app.use((error, req, res, next) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message
		})
	}
	console.error(error)

	return res.status(500).json({
		status: 'error',
		message: 'Internal server error'
	})
})

app.listen(PORT, () => {
	console.log(`server is running at port ${PORT}`)
})

// app.get("/:username", (req, res) => {
//   const {username} = req.params
//   res.send(`Hello, world! my name is ${username}`)
// })

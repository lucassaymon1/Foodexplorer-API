const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const {hash, compare} = require("bcryptjs")
const authConfig = require("../configs/auth")
const {sign} = require("jsonwebtoken")

class SessionsController{
  async create(req, res){
    const {email, password} = req.body

    const user = await knex("users").where({email}).first()
    const passwordMatched = compare(password, user.password)

    if(!user || !passwordMatched){
      throw new AppError("Email e/ou senha iniválidos!")
    }

    const {secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
    console.log({user, token})
    return res.json({user, token})
    
  }
}

module.exports = SessionsController
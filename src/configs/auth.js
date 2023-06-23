// place where is loaded the base token structure

module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET,
    expiresIn: "1d"
  }
}
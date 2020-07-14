// Dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const user_pool = require('../database.js')

// Configuration
const app = express()
const users = express.Router()


// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


// CREATE
users.post('/', async (req, res) => {
  try {
    req.body.user_password = bcrypt.hashSync(req.body.user_password, bcrypt.genSaltSync(10))
    const { user_name, user_email, user_password } = req.body
    const newUser = await user_pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3)", [user_name, user_email, user_password])
    res.json(newUser.rows)
  } catch (err) {
    console.log(err);
  }
})

// READ
users.get('/', async (req, res) => {
  try {
    const allUsers = await user_pool.query("SELECT * FROM users")
    res.json(allUsers.rows)
  } catch (err) {
    console.log(err);
  }
})


module.exports = users

const express = require('express')
const { getUser, createUser, login } = require('../controllers/userControl')
const { verifyToken } = require('../middleware/verifyToken')
const { refreshToken } = require('../controllers/refreshtoken')

const router = express.Router()

router.get('/user',verifyToken, getUser)
.post('/user', createUser)
.post('/login', login)
.get('/token', refreshToken)
.post('/logout', refreshToken)

module.exports = router
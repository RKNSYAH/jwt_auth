const express = require('express')
const db = require('./config/db')
const router = require('./router/userRoute')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(router)
app.listen(5000, async ()=> {console.log(`Server berjalan di port 5000`)})
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import connectDB from './db/connection.js'
import userRouters from './routers/userRouters.js'
import bodyParser from 'body-parser'

const app = express()

const oneDay = 1000 * 60 * 60 * 24
// middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
  })
)
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

connectDB()

app.use('/user', userRouters)

app.listen(5000, (req, res) => {
  console.log('Server is running on port 5000')
})

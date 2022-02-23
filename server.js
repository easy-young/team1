const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const Memorystore = require('memorystore')(session)
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

require('dotenv').config()

const app = express()
const router = require('./routers')

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
})

app.use('/', express.static('public'));

const maxAge = 6*600000
let sessionObj = {
    secret: "kimhelp",
    resave : false,
    saveUninitialized: true,
    store: new Memorystore({ checkPeriod: maxAge}),
    cookie:{
        maxAge:maxAge
    }
}

app.use(session(sessionObj))
app.use(express.urlencoded({extended:true,}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(router)

app.listen(3000, () => {
  console.log(`server start : ${PORT}`)
})
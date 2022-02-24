const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const Memorystore = require('memorystore')(session)
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
    secret: "kim",
    resave : false,
    saveUninitialized: true,
    store: new Memorystore({ checkPeriod: maxAge}),
    cookie:{
        maxAge:maxAge
    }
}

app.use(session(sessionObj))
app.use(express.urlencoded({extended:true,}))
<<<<<<< HEAD

=======
>>>>>>> c5e158d7cf6783890e3aabad4a07cab23f82d957

app.use(router)

app.listen(3000, () => {
  console.log(`server start : ${PORT}`)
})
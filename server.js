const express = require('express')
const nunjucks = require('nunjucks')
const PORT = process.env.PORT || 3000
const router = require('./routers')
const app = express()


app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
})

router.get(`/`,(req,res)=>{
    res.render('index');
});



app.use(express.static('public'))
app.use(express.urlencoded({extended:true,}))
app.use(router)

app.listen(PORT,()=>{
    console.log(`server start: ${PORT}`)
})


const { request } = require('express')
const express = require('express')
const {alertmove} = require('../../util/alert')
const router = express.Router()
const data = require('./data')

router.get('/list',(req,res)=>{
    const item = req.body
    res.render('board/list',{
        data:data,
        item:item,
    })
})
router.get('/view',(req,res)=>{
    let index = req.query.index
    let item = data[index]
    console.log(item);
    res.render('board/view',{
        index:index,
        item:item,
    })
    
})

module.exports = router

const { request } = require('express')
const express = require('express')
const {alertmove} = require('../../util/alert')
const router = express.Router()
const data = require('./data')
const pool = require('../../db');

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

router.get('/write',(req,res)=>{
    res.render('board/write')
})
router.post('/write',(req,res) =>{
    let { title,content } = req.body;
    console.log(req.body)
        pool.getConnection( (err,conn)=>{
            conn.query(`INSERT INTO board(title,content) VALUES('${title}','${content}')`,
                (error,result)=>{
                    console.log(result)
                        res.render('board/list',{result})
        })
        conn.release();
    })
});

module.exports = router






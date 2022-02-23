const express = require('express')
const router = express.Router()
const {alertmove} = require('../../util/alert')
// const user = require('../../models/user')
const db = require('../../db')
const pool = require('../../db');


router.get('/login',(req,res)=>{
    res.render('user/login')
})
router.get('/register',(req,res)=>{
    res.render('user/register')
})
router.post('/register',(req,res,next)=>{
    console.log(req.body);
    const param = [req.body.userid,req.body.userpw,req.body.name,req.body.username,req.body.level,req.body.birth,req.body.gender,req.body.contact,req.body.phone]
    db.query('INSERT INTO user(`userid`,`userpw`,`name`,`username`,`level`,`birth`,`gender`,`contact`,`phone`) VALUES(?,?,?,?,?,?,?,?,?)',param,(err,row)=>{
        if(err) console.log(err);
    })
    res.render('user/profile')
})

router.post('/login',(req,res)=>{
    param = [req.body.userid,req.body.userpw]
    db.query('select * from user where userid=? and userpw=?',[param[0],param[1]],(err,row)=>{
        if(err) console.log(err)
        if(row.length > 0){
            //req.session.user = {...param}
            res.render('./index',{user:req.session})
            console.log(`${param[0]} , ${param[1]} 성공적으로 로그인!`)
            // res.send(alertmove('./index',`${req.body.userid}님 접속 성공!`))
        } else {
            res.send(alertmove('/user/login','접속 불가!'))
        }
    })
})


// router.get('/profile',(req,res)=>{
//     res.render('user/profile',{
//         user:user
//     })
//     res.redirect('/')
// })


router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        req.session
    })

    res.send(alertmove('/','로그아웃 완료'))
})

module.exports = router
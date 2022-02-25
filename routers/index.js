const express = require('express')
const router = express.Router()
const {alertmove} = require('../util/alert')
const userRouter = require('./user')
const boardRouter = require('./board')
const adminRouter = require('./admin');
<<<<<<< HEAD
=======
// const adminRouter = require('./admin/promise');
>>>>>>> d757b5bd85b5724d5ce4c86733c1a0f74ccfb267



router.get('/',(req,res)=>{
    const {user} = req.session
    res.render('index',{
        user
    })
})

const login = (req,res,next)=>{
    let {user} = req.session
        if ({user} != undefined) {
            next()
        } else {
            res.send(alertmove('/','권한 없음'))
        }
    }

router.use('/user',userRouter)
router.use('/board',login,boardRouter)
router.use('/admin', adminRouter);

module.exports = router

const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const router = express.Router();
const pool = require('../../db');

router.get('/', (req, res)=>{
    res.render('admin');
});

router.post('/', (req, res)=>{
    let {userid, userpw} = req.body;
    pool.getConnection((err, conn)=>{
        conn.query(`SELECT userid, userpw FROM user WHERE userid='${userid}' AND userpw='${userpw}' AND level='1'`, (error, result)=>{
            if (result.length != 0) {
                res.redirect('admin/list');
            } else {
                res.redirect('admin');
            }
        });
        conn.release();
    });
});

router.get('/list', (req, res)=>{
    pool.getConnection((err, conn)=>{
        conn.query(`SELECT num, username, level, date FROM user ORDER BY date ASC`, (error, result)=>{
            let list = result;
            res.render('admin/list', {list});
        });
        conn.release();
    });
});

router.get('/view', (req, res)=>{
    const index = req.query.index;
    pool.getConnection((err, conn)=>{
        conn.query(`SELECT * FROM user`, (error, result)=>{
            let list = result;
            res.render('admin/view', {list, index});
        });
        conn.release();
    });
});

router.get('/update', (req, res)=>{
    const index = req.query.index;
    pool.getConnection((err, conn)=>{
        conn.query(`SELECT * FROM user`, (error, result)=>{
            let list = result;
            res.render('admin/update', {list, index});
        });
        conn.release();
    });
});

router.post('/update', (req, res)=>{
    const index = req.body.index;
    let {level, status} = req.body;
    pool.getConnection((err, conn)=>{
        conn.query(`UPDATE user SET level='${level}', status='${status}' WHERE num='${index}'`, (error, result)=>{
            res.redirect(`/admin/view?index=${index}`);
        });
        conn.release();
    });
});

module.exports = router;
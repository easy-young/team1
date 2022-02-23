const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const router = express.Router();
const {alertmove} = require('../../util/alert');
const pool = require('../../db');

router.get('/', (req, res)=>{
    res.render('admin');
});

router.post('/', (req, res)=>{
    let {userid, userpw} = req.body;
    pool.getConnection((err, conn)=>{
        conn.query(`SELECT userid, userpw FROM user WHERE userid='${userid}' AND userpw='${userpw}' AND level='1'`, (error, result)=>{
            if (result.length != 0) {
                req.session.userid = result[0].userid;
                res.redirect('admin/list');
            } else {
                res.send(alertmove('admin', 'Check your ID or Password.'));
            }
        });
        conn.release();
    });
});

router.get('/list', (req, res)=>{
    if (req.session.userid != undefined) {
        pool.getConnection((err, conn)=>{
            conn.query(`SELECT num, username, level, date FROM user ORDER BY date ASC`, (error, result)=>{
                res.render('admin/list', {result});
            });
            conn.release();
        });
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/view', (req, res)=>{
    const index = req.query.index;
    if (req.session.userid != undefined) {
        pool.getConnection((err, conn)=>{
            conn.query(`SELECT * FROM user`, (error, result)=>{
                res.render('admin/view', {result, index});
            });
            conn.release();
        });
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/update', (req, res)=>{
    const index = req.query.index;
    if (req.session.userid != undefined) {
        pool.getConnection((err, conn)=>{
            conn.query(`SELECT * FROM user`, (error, result)=>{
                res.render('admin/update', {result, index});
            });
            conn.release();
        });
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
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

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        req.session
    });
    res.send(alertmove('/admin', 'Bye.'));
});

module.exports = router;
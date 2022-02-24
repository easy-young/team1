const express = require('express');
const nunjucks = require('nunjucks');
const router = express.Router();
const {alertmove} = require('../../util/alert');
const pool = require('../../db');

router.get('/', (req, res)=>{
    res.render('admin');
});

router.post('/', (req, res)=>{
    let {userid, userpw} = req.body;
    pool.getConnection((err, conn)=>{
        conn.query(`SELECT userid, userpw FROM user WHERE userid='${userid}' AND userpw='${userpw}' AND level='1';`, (error, result)=>{
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
            conn.query(`SELECT num, username, level, date FROM user ORDER BY date ASC;`, (error, result)=>{
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
            conn.query(`SELECT * FROM user;`, (error, result)=>{
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
            conn.query(`SELECT * FROM user;`, (error, result)=>{
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

router.get('/board', (req, res)=>{
    if (req.session.userid != undefined) {
        pool.getConnection((err, conn)=>{
            conn.query(`SELECT * FROM board;`, (error, result)=>{
                res.render('admin/board', {result});
            });
            conn.release();
        });
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/board_delete', (req, res)=>{
    if (req.session.userid != undefined) {
        pool.getConnection((err, conn)=>{
            conn.query(`SELECT * FROM board;`, (error, result)=>{
                res.render('admin/board_delete', {result});
            });
            conn.release();
        });
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.post('/board_delete', (req, res)=>{
    let arr = [];
    if (req.session.userid != undefined) {
        for (prop in req.body) {
            arr.push(req.body[prop]);
        }
        pool.getConnection((err, conn)=>{
            conn.query(`DELETE FROM board WHERE num IN (${arr});`, (error, result)=>{
                res.redirect('/admin/board');
            });
            conn.release();
        });
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        req.session
    });
    res.send(alertmove('/admin', 'Bye.'));
});

module.exports = router;
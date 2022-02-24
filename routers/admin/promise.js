const express = require('express');
const nunjucks = require('nunjucks');
const router = express.Router();
const {alertmove} = require('../../util/alert');
const pool = require('../../db_promise').pool;

router.get('/', (req, res)=>{
    res.render('admin');
});

router.post('/', async (req, res)=>{
    let {userid, userpw} = req.body;
    let sql = `SELECT userid, userpw FROM user WHERE userid=? AND userpw=? AND level='1';`;
    let [result, fields] = await pool.execute(sql, [userid, userpw]);
    if (result.length != 0) {
        req.session.userid = result[0].userid;
        res.redirect('admin/list');
    } else {
        res.send(alertmove('admin', 'Check your ID or Password.'));
    }
});

router.get('/list', async (req, res)=>{
    let sql = `SELECT num, username, level, date FROM user ORDER BY date ASC;`;
    if (req.session.userid != undefined) {
        let [result] = await pool.execute(sql);
        res.render('admin/list', {result});
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/view', async (req, res)=>{
    const index = req.query.index;
    let sql = `SELECT * FROM user;`;
    if (req.session.userid != undefined) {
        let [result] = await pool.execute(sql);
        res.render('admin/view', {result, index});
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/update', async (req, res)=>{
    const index = req.query.index;
    let sql = `SELECT * FROM user;`;
    if (req.session.userid != undefined) {
        let [result] = await pool.execute(sql);
        res.render('admin/update', {result, index});
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.post('/update', async (req, res)=>{
    const index = req.body.index;
    let {level, status} = req.body;
    let sql = `UPDATE user SET level=?, status=? WHERE num=?;`;
    let [result, fields] = await pool.execute(sql, [level, status, index]);
    res.redirect(`/admin/view?index=${index}`);
});

router.get('/board', async (req, res)=>{
    let sql = `SELECT * FROM board;`;
    if (req.session.userid != undefined) {
        let [result] = await pool.execute(sql);
        res.render('admin/board', {result});
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/board_delete', async (req, res)=>{
    let sql = `SELECT * FROM board;`;
    if (req.session.userid != undefined) {
        let [result] = await pool.execute(sql);
        res.render('admin/board_delete', {result});
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.post('/board_delete', async (req, res)=>{
    let arr = [];
    if (req.session.userid != undefined) {
        for (prop in req.body) {
            arr.push(req.body[prop]);
        }
        let sql = `DELETE FROM board WHERE num IN (${arr});`;
        let [result] = await pool.execute(sql);
        res.redirect('/admin/board');
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
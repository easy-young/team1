const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const router = express.Router();
const {alertmove} = require('../../util/alert');
const pool = require('../../db_promise').pool;

router.get('/', (req, res)=>{
    res.render('admin');
});

router.post('/', async (req, res)=>{
    let {userid, userpw} = req.body;
    let sql = `SELECT userid, userpw FROM user WHERE userid=? AND userpw=? AND level='1'`;
    let [result, fields] = await pool.execute(sql, [userid, userpw]);
    if (result.length != 0) {
        req.session.userid = result[0].userid;
        res.redirect('admin/list');
    } else {
        res.send(alertmove('admin', 'Check your ID or Password.'));
    }
});

router.get('/list', async (req, res)=>{
    let sql = `SELECT num, username, level, date FROM user ORDER BY date ASC`;
    if (req.session.userid != undefined) {
        let [result] = await pool.execute(sql);
        res.render('admin/list', {result});
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/view', async (req, res)=>{
    const index = req.query.index;
    let sql = `SELECT * FROM user`;
    if (req.session.userid != undefined) {
        let [result] = await pool.execute(sql);
        res.render('admin/view', {result, index});
    } else {
        res.send(alertmove('/admin', 'Login first.'));
    }
});

router.get('/update', async (req, res)=>{
    const index = req.query.index;
    let sql = `SELECT * FROM user`;
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
    let sql = `UPDATE user SET level=?, status=? WHERE num=?`;
    let [result, fields] = await pool.execute(sql, [level, status, index]);
    res.redirect(`/admin/view?index=${index}`);
});

router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        req.session
    });
    res.send(alertmove('/admin', 'Bye.'));
});

module.exports = router;
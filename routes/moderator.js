const express = require('express');
const router = express.Router();
const Moderator = require('../models/entry');
console.log('started entries');

let testLogin  = '1234';
let testPass = '123';

// entries
router.get('/login', async function (req, res, next) {
    let moderator = await Moderator.mostRecent();
    res.render('moderator/login');
});

router.post('/login', async function (req, res, next) {
    const moderator = new Moderator({
        login: req.body.login,
        password: req.body.password,
    });
    await moderator.save();

    res.send({moderator});
});

// //new entries
// router.get('/new', function (req, res, next) {
//     res.render('entries/new');
// });
//
// //detail entry
// router.get('/:id', async function (req, res, next) {
//     let entry = await Entry.findById(req.params.id);
//     res.render('entries/show', { entry });
// });
//
// router.put('/:id', async function (req, res, next) {
//     let entry = await Entry.findById(req.params.id);
//
//     entry.title = req.body.title;
//     entry.body = req.body.body;
//     await entry.save();
//
//     res.redirect(`/entries/${entry.id}`);
//
// });
//
// router.delete('/:id', async function (req, res, next) {
//     await Entry.deleteOne({'_id': req.params.id});
//     res.redirect('/');
// });
//
// router.get('/:id/edit', async function (req, res, next) {
//     let entry = await Entry.findById(req.params.id);
//     res.render('entries/edit', { entry });
// });
module.exports = router;



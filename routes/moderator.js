const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
// console.log('started entries');



router.get('/login', async function (req, res, next) {
    // let entries = await User.mostRecent();
    // // console.log(entries);
    res.render('moderator/login');
});

router.post('/login',async (req, res) => {
  const { username, password } = req.body;
  const moderator = await Admin.findOne({login:username});

  if (moderator && (moderator.password === password)) {
    //req.session.user = user;
    if (moderator.rules){
      res.json({admin:true})
    } else{
      res.json({admin:false})
    }
  } else {

   res.json({status:false})
  }
});

//new entries
router.get('/new', function (req, res, next) {
    res.render('entries/new');
});

//detail entry
router.get('/:id', async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
    res.render('entries/show', { entry });
});

router.put('/:id', async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
 
    entry.title = req.body.title;
    entry.body = req.body.body;
    await entry.save();

    res.redirect(`/entries/${entry.id}`);

});

router.delete('/:id', async function (req, res, next) {
    await Entry.deleteOne({'_id': req.params.id});
    res.redirect('/');
});

router.get('/:id/edit', async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
    res.render('entries/edit', { entry });
});
module.exports = router;



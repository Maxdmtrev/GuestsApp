const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const User = require('../models/user');
// console.log('started entries');

router.get('/', async function (req, res, next) {
  const moderator = req.session.moderator;
  const guest = await User.find({});
  console.log(guest);
  res.render('moderator/guestlist',{guest, moderator});
});


router.get('/login', async function (req, res, next) {
    // let entries = await User.mostRecent();
    // // console.log(entries);
  const moderator = req.session.moderator;
    res.render('moderator/login',{moderator});
});

router.post('/login',async (req, res) => {
  const { login, password } = req.body;
  const moderator = await Admin.findOne({login});
  if (moderator) {
    req.session.moderator = moderator;

  }

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

// router.get("/logout", async (req, res, next) => {
//   if (req.session.user) {
//     try {
//       await req.session.destroy();
//       res.clearCookie("user_sid");
//       res.redirect("/moderator/login");
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     res.redirect("/moderator/login");
//   }
// });

router.get("/logout", async (req, res, next) => {
  if (req.session.moderator) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/");
  }
});

router.get('/new', async (req, res, next) => {
  const moderator = req.session.moderator;
  return res.render('moderator/new', {moderator});
});


router.post('/new', async (req, res, next) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const newDate = req.body.date;
  console.log(req.body);

  const guest = new User({first_name: firstName, last_name: lastName, date: newDate});
  console.log(guest);
  try {
    await guest.save();
    // throw Error('You shall not pass');
    return res.redirect(`/moderator`);
  }
  catch (err) {
    return res.render('moderator/new', { errors: [err] });
  }
});

//new entries
// router.get('/new', function (req, res, next) {
//     res.render('entries/new');
// });

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



const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const User = require('../models/user');
// console.log('started entries');

router.get('/admin', async function (req, res, next) {
  const moderator = req.session.moderator;
  const guest = await User.find({});
  const moderators = await Admin.find({rules:false});
  res.render('moderator/admin',{guest,moderators, moderator});
});

router.get('/delete/:id', async function (req, res, next) {
  await Admin.deleteOne({ _id: req.params.id });
  const moderator = req.session.moderator;
  const guest = await User.find({});
  const moderators = await Admin.find({rules:false});
  res.render('moderator/admin',{guest,moderators, moderator});

});

router.get('/newModerator', async function (req, res, next) {
   const moderator = req.session.moderator;
   res.render('moderator/newModerator',{moderator});
 });

router.post('/newModerator', async function (req, res, next) {
  const login = req.body.login;
  const password = req.body.password;

  const newmoderator = new Admin({login: login, password: password, rules: false});

  try {
    await newmoderator.save();
    // throw Error('You shall not pass');
    return res.redirect(`/moderator/admin`);
  }
  catch (err) {
    return res.render('moderator/newModerator', { errors: [err] });
  }
});



router.get('/login', async function (req, res, next) {
    // let entries = await User.mostRecent();
    // // console.log(entries);
    const moderator = req.session.moderator;
    res.render('moderator/login', { moderator });
});

router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const moderator = await Admin.findOne({ login });
    if (moderator) {
        req.session.moderator = moderator;

    }

    if (moderator && (moderator.password === password)) {
        //req.session.user = user;
        if (moderator.rules) {
            res.json({ admin: true })
        } else {
            res.json({ admin: false })
        }
    } else {
        res.json({ status: false })
    }
});


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
    return res.render('moderator/new', { moderator });
});


router.post('/new', async (req, res, next) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const newDate = req.body.date;
    console.log(req.body);

    const guest = new User({ first_name: firstName, last_name: lastName, date: newDate });
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

router.route('/admin/new')

    .get(async (req, res, next) => {
        const moderator = req.session.moderator;
        return res.render('moderator/new', { moderator });
    })
    .post(async (req, res, next) => {
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const newDate = req.body.date;
        const guest = new User({ first_name: firstName, last_name: lastName, date: newDate });
        console.log(guest);
        try {
            await guest.save();
            // throw Error('You shall not pass');
            return res.redirect(`/moderator/admin`);
        }
        catch (err) {
            return res.render('moderator/new', { errors: [err] });
        }
    });

router.get('/admin/delete/:id', async function (req, res, next) {
  await User.deleteOne({ _id: req.params.id });
  const moderator = req.session.moderator;
  const guest = await User.find({});
  const moderators = await Admin.find({rules:false});
  res.render('moderator/admin',{guest,moderators, moderator});

});

// router.route('/admin/:id')
//   .delete(async (req, res, next) => {
//     console.log(1111, req.body);
//     if (await User.deleteOne({ '_id': req.params.id })) {
//       let answer = await User.deleteOne({ '_id': req.params.id });
//       console.log("DELETED: ", answer)
//       return res.json({ status: "ok", result: answer })
//     } else {
//       let answer = await Admin.deleteOne({ '_id': req.params.id });
//       return res.json({status:false})
//     }
//   });

module.exports = router;



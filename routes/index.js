const express = require('express');
const router = express.Router();

<<<<<<< HEAD
router.get('/', function (req, res, next) {
  res.redirect('/moderator');
=======

router.route('/')
.get((req, res, next) => {
  res.render('entries/index');
>>>>>>> 307e92e5ec4869fc89a332b55cf945b44ba87d7f
});









module.exports = router;

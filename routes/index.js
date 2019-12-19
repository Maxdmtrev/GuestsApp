const express = require('express');
const router = express.Router();


// router.get('/', function (req, res, next) {
//   res.redirect('/moderator');


router.route('/')
.get((req, res, next) => {
  res.render('moderator/index');

});


module.exports = router

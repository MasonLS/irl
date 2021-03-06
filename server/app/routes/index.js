const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/dates', require('./dates'));

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
  res.status(404).end();
});

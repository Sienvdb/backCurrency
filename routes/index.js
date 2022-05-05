var express = require('express');
var router = express.Router();
const transfersController = require("./../controllers/transfers");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/leaderboard', (req, res, next) => {
    router.get("/leaderboard", transfersController.getCoins);
    res.render('leaderboard');
});

module.exports = router;
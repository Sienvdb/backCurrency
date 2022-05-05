const express = require('express');
const router = express.Router();
const transfersController = require("./../controllers/transfers");

router.get("/leaderboard", transfersController.getCoins);

module.exports = router;
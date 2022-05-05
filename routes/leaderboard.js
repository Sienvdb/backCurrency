const express = require('express');
const router = express.Router();
const leaderboardController = require("./../controllers/leaderboard");

router.get("/", leaderboardController.getCoins);

module.exports = router;
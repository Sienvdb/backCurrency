const express = require('express');
const router = express.Router();
const transfersController = require("./../controllers/transfers");

router.get("/", transfersController.getAll);
router.post("/", transfersController.create);
router.get("/:id", transfersController.getId);
router.get("/leaderboard", transfersController.getCoins);

module.exports = router;
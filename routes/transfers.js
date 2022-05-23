const express = require('express');
const router = express.Router();
const passport = require('./../passport/passport');
const transfersController = require("./../controllers/transfers");

router.get("/transfers", transfersController.getAllTransfersByToken);
router.post("/transfers", transfersController.create);
router.get("/transfers/:id", transfersController.getTransferId);
router.get("/getCoins", passport.authenticate('jwt', {session: false}), transfersController.getCoins);

module.exports = router;
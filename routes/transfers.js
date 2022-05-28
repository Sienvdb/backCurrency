const express = require('express');
const router = express.Router();
const passport = require('./../passport/passport');
const transfersController = require("./../controllers/transfers");


router.get("/transfers", transfersController.getAllTransfersByToken);
router.get("/transfers/paginate", transfersController.paginatedResults, (req, res) => {
    res.json(res.paginatedResults);
});
router.post("/transfers", transfersController.create);
router.get("/transfers", transfersController.getTransferId);
router.get("/getCoins", passport.authenticate('jwt', {session: false}), transfersController.getCoins);


module.exports = router;
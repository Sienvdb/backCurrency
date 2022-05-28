const express = require('express');
const router = express.Router();
const passport = require('./../passport/passport');
const Transfer = require("../models/transfer");
const transfersController = require("./../controllers/transfers");

const bitch =  async (req, res, next) => {
    const transfers = await Transfer.findAll(); 
}

router.get("/transfers", transfersController.getAllTransfersByToken);
router.get("/transfers/paginate", paginatedResults(bitch), (req, res) => {
    res.json(res.paginatedResults);
});
router.post("/transfers", transfersController.create);
router.get("/transfers", transfersController.getTransferId);
router.get("/getCoins", passport.authenticate('jwt', {session: false}), transfersController.getCoins);

function paginatedResults (model) {

    return async (req, res, next) => {
        let {page, size} = req.query;

        if(!page) {
            page = 1;
        }
        if(!size) {
            size = 5;
        }

        const limit = parseInt(size);
        const skip = (page -1) * size;

        const transfers = await Transfer.find().limit(limit).skip(skip);

        res.send({
            page, size, data: transfers
        })
    }
}

module.exports = router;
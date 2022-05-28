const express = require('express');
const router = express.Router();
const passport = require('./../passport/passport');
const page = require('./../middleware/pagination');
const transfersController = require("./../controllers/transfers");

const transfers = [
    {
        id: 1,
        full_name: "Kendre Abelevitz"
      },
      {
        id: 2,
        full_name: "Rona Walas"
      },
      {
        id: 3,
        full_name: "Myrtle Baser"
      },
      {
        id: 4,
        full_name: "Washington Walklot"
      },
      {
        id: 5,
        full_name: "Jo De Domenici"
      },
      {
        id: 6,
        full_name: "Lief Mungham"
      }
]

router.get("/transfers", transfersController.getAllTransfersByToken);
router.get("/transfers/paginate", paginatedResults(transfers), (req, res) => {
    res.json(res.paginatedResults);
});
router.post("/transfers", transfersController.create);
router.get("/transfers", transfersController.getTransferId);
router.get("/getCoins", passport.authenticate('jwt', {session: false}), transfersController.getCoins);

function paginatedResults (model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parse = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if(endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        results.results = model.slice(startIndex, endIndex);
        res.paginatedResults = results;
        next();
    }
}

module.exports = router;
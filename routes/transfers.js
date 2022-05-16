const express = require('express');
const router = express.Router();
const transfersController = require("./../controllers/transfers");

router.get("/", transfersController.getAllTransfersByToken);
router.post("/", transfersController.create);
router.get("/:id", transfersController.getTransferId);

module.exports = router;
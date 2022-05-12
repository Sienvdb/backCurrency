const express = require('express');
const router = express.Router();
const transferController = require("./../controllers/transfer");

router.get("/bySender", transferController.getAllTransfersBySender);
router.get("/byReceiver", transferController.getAllTransfersByReceiver);

module.exports = router;
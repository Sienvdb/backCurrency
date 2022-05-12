const express = require('express');
const router = express.Router();
const transferController = require("./../controllers/transfer");

router.get("/", transferController.getAllTransfersBySender);

module.exports = router;
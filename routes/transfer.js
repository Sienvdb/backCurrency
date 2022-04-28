const express = require('express');
const router = express.Router();
const transfersController = require("./../controllers/transfers");

router.get("/", transfersController.getAll);

module.exports = router;
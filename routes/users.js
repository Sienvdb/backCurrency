const express = require('express');
const router = express.Router();
const userController = require("./../controllers/users");

router.get("/login", userController.login);

module.exports = router;
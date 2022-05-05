const express = require('express');
const router = express.Router();
const userController = require("./../controllers/users");

router.get("/", userController.verification)
router.get("/login", userController.login);
router.get("/signup", userController.signup);

module.exports = router;
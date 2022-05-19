const express = require('express');
const router = express.Router();
const userController = require("./../controllers/users");

<<<<<<< HEAD
router.get("/", userController.verification)
router.get("/token", userController.getValuesByToken)
=======

router.get("/getCoins", userController.getCoins);
>>>>>>> 492821735d95f3ed08195a09e4f18cd1b6ad0e48
router.post("/login", userController.login);
router.post("/signup", userController.signup);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require("./../controllers/users");

router.get("/username/:username", userController.getIdByUsername);
router.get("/token", userController.getValuesByToken)
router.post("/login", userController.login);
router.post("/signup", userController.signup);
 
module.exports = router;
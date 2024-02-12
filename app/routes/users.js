const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");


router.get("/", usersController.home);
router.get("/list", usersController.usersList);

router.post("/add", usersController.addUser);

module.exports = router;
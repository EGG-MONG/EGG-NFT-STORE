const express = require("express");

const router = express.Router();

const {FavoriteController} = require("../controllers");

router.post("/", FavoriteController.insertOrUpdate);

router.get("/:accout", FavoriteController.getList);

module.exports = router;
const express = require("express");

const router = express.Router();

const BlockController = require("../controllers");

router.get("/block", BlockController.get);

router.get("/blocks", BlockController.getList);

module.exports = router;
const express = require("express");

const router = express.Router();

const { NftController } = require("../controllers");

router.post("/", NftController.create);

router.put("/", NftController.update);

router.get("/", NftController.getList);

module.exports = router;
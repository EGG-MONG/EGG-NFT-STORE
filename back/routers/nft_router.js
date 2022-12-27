const express = require("express");

const router = express.Router();

const { NftController } = require("../controllers");

router.post("/", NftController.create);

router.put("/list", NftController.updateList);
router.put("/sale", NftController.updateSale);


router.get("/", NftController.getList);

module.exports = router;
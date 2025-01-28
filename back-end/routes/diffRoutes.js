const express = require("express");
const diffController = require("../controllers/diffController");
const multer = require("multer");

const upload = multer();
const router = express.Router();

router.post("/", upload.fields([{ name: "doc1" }, { name: "doc2" }]), diffController.analyzeDiff);

module.exports = router;
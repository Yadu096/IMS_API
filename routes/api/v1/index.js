const express = require("express");
const router = express.Router();

router.use("/item", require("./items.js"));

module.exports = router;

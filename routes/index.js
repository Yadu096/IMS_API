const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.use("/api", require("./api"));

module.exports = router;

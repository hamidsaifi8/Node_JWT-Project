const express = require("express");
const { login, dashboard } = require("../controllers/main");
const router = express.Router();

router.post("/login", login);
router.get("/dashboard", dashboard);

module.exports = router;

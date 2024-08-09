const { Router } = require("express");
const runCode = require("../Controllers/runCode.js");
const submitCode = require("../Controllers/submitCode.js");

const router = Router();

router.post("/run", runCode);
router.post("/submitCode", submitCode);

module.exports = router; // Corrected here

const { Router } = require("express");
const runCode = require("../Controllers/runCode.js");
const submitCode = require("../Controllers/submitCode.js");
const problem_detail = require("../Controllers/problem_detail.js");

const router = Router();

router.post("/run", runCode);
router.post("/submitCode", submitCode);
router.post("/problem_detail", problem_detail);

module.exports = router; // Corrected here

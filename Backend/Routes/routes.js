const { Router } = require("express");
const problem_detail = require("../Controllers/problem_detail.js");
const addProblem = require("../Controllers/addproblem.js");
const problem_list = require("../Controllers/problem_list.js");
const processCode = require('../Controllers/processCode.js')

const router = Router();

router.post("/run", processCode);
router.post("/submitCode", processCode);
router.post("/problem_detail", problem_detail);
router.post("/addproblem", addProblem);
router.get("/problem_list", problem_list);

module.exports = router; // Corrected here

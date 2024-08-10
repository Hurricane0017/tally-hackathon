const generateExeCpp = require("../ProcessCode/Compile.js");
const runExecutable = require("../ProcessCode/Run.js");
const fs = require("fs");
const path = require("path");


const runCode = async (req, res) => {
  const { code, language, input } = req.body;
  const basePath = path.join(__dirname, "..", "ProcessCode");
  const outputFile = path.join(basePath,'..','Files', "output.txt");
  const errorFile = path.join(basePath,'..','Files', "error.txt");

  try {
    if (language === "cpp") {
      await generateExeCpp(code);
      await runExecutable(input);

      // Check if output.txt exists
      if (fs.existsSync(outputFile)) {
        const output = fs.readFileSync(outputFile, "utf-8");
        res.status(200).json({ status: "success", output });
      } else {
        const error = fs.readFileSync(errorFile, "utf-8");
        res.status(200).json({ status: "error", error });
      }
    } else {
      res.status(400).json({ status: "error", message: "Unsupported language" });
    }
  } catch (error) {
    res.status(200).json({ status: "error", message: error.message });
  }
};

module.exports = runCode;

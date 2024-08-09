const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");


const generateExeCpp = (code) => {
  const basePath = path.join(__dirname, "..", "ProcessCode");
  const fileName = path.join(basePath,'..','Files', "code.cpp");
  const errorFile = path.join(basePath,'..','Files', "error.txt");
  const executablePath = path.join(basePath,'..','Files', "a.out");

  return new Promise((resolve, reject) => {
    fs.writeFileSync(fileName, code);

    // Compile the C++ code
    exec(`g++ ${fileName} -o ${executablePath}`, (error, stdout, stderr) => {
      if (error) {
        fs.writeFileSync(errorFile, error.message);
        return reject(new Error(`Compilation failed: ${error.message}`));
      }
      if (stderr) {
        fs.writeFileSync(errorFile, stderr);
        return reject(new Error(`Compilation error: ${stderr}`));
      }

      resolve(stdout); // You can return any relevant information, such as the output
    });
  });
};

module.exports = generateExeCpp;

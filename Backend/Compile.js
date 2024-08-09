const { exec } = require("child_process");
const fs = require("fs");

export const generateExeCpp = ({ code }) => {
  const fileName = "code.cpp";
  fs.writeFileSync(fileName, code);

  // Compile the C++ code
  exec(`g++ ${fileName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
  });
};


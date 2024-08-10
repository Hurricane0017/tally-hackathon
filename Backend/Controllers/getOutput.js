const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const getOutput = () => {
  const codeFile = path.join(__dirname, '..', 'Files', 'user_code.cpp');
  const outputFile = path.join(__dirname, '..', 'Files', 'output');
  const outputTextFile = path.join(__dirname, '..', 'Files', 'output.txt');
  const errorFile = path.join(__dirname, '..', 'Files', 'error.txt');
  const inputFile = path.join(__dirname, '..', 'Files', 'input.txt');

  return new Promise((resolve, reject) => {
    // Compilation command
    const compileCmd = `docker run --rm -v ${codeFile}:/code/user_code.cpp:ro -v ${path.dirname(outputFile)}:/code:rw my-cpp-judge-image g++ -o /code/output /code/user_code.cpp`;
    
    // Execution command with input redirection and output redirection
    const runCmd = `docker run --rm --memory=256m --cpus="0.5" -v ${path.dirname(outputFile)}:/code:rw -v ${inputFile}:/code/input.txt:ro my-cpp-judge-image /code/output < /code/input.txt > /code/output.txt`;

    // Compile the code
    exec(compileCmd, (compileErr, stdout, stderr) => {
      if (compileErr) {
        // Write compilation errors to the error file
        fs.writeFileSync(errorFile, stderr);
        return reject(stderr || 'Compilation error');
      }

      // Run the compiled code with input and output redirection
      exec(runCmd, { timeout: 5000 }, (runErr, runStdout, runStderr) => {
        if (runErr) {
          if (runErr.killed) {
            // Write "Time Limit Exceeded" to the error file
            fs.writeFileSync(errorFile, "Time Limit Exceeded");
            return reject('Execution time exceeded');
          }
          // Write runtime errors to the error file
          fs.writeFileSync(errorFile, runStderr);
          return reject(runStderr || 'Execution error');
        }

        // Read the output from the output file
        const finalOutput = fs.readFileSync(outputTextFile, 'utf8');
        resolve(finalOutput);
      });
    });
  });
};

module.exports = getOutput;

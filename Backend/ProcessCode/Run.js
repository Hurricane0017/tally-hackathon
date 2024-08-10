const { spawn } = require('child_process');
const { error } = require('console');
const fs = require('fs');
const path = require('path');


const runExecutable = (input) => {
  const timeoutMs = 5000;
  return new Promise((resolve, reject) => {
    const basePath = path.join(__dirname, "..", "ProcessCode");
    const exePath = path.join(basePath, '..', 'Files', "a.out");
    const outputFile = path.join(basePath, '..', 'Files', "output.txt");

    // Spawn the process to run the executable
    const process = spawn(exePath);
    let output = '';

    // Write input to the process
    process.stdin.write(input);
    process.stdin.end();

    // Collect output from the process
    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    // Handle process errors
    process.on('error', (err) => {
      reject(new Error(`Failed to start process: ${err.message}`));
    });

    // Handle process completion
    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`a.out exited with code ${code}`));
      } else {
        // Write output to file
        fs.writeFile(outputFile, output, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(output);
          }
        });
      }
    });

    // Set a timeout to reject if the process runs too long
    const timeout = setTimeout(() => {
      process.kill(); // Kill the process
      reject(new Error(`Time Limit Exceeded!`));
    }, timeoutMs);

    // Clear the timeout if process completes before timeout
    process.on('close', () => clearTimeout(timeout));
  });
}

module.exports = runExecutable;

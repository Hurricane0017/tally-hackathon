const { spawn } = require('child_process');
const fs = require('fs');

// Function to run the executable and write output to file
export function runExecutable(input) {
  return new Promise((resolve, reject) => {
    const process = spawn('./a.exe');
    let output = '';

    // Write input to the process
    process.stdin.write(input);
    process.stdin.end();

    // Collect output
    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    // Handle process completion
    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`a.exe exited with code ${code}`));
      } else {
        // Write output to file
        fs.writeFile('output.txt', output, (err) => {
          if (err) reject(err);
          else resolve(output);
        });
      }
    });
  });
}

// Example usage

// const input = "5"; // Replace with your actual input
// runExecutable(input)
//   .then(output => {
//     console.log('Execution completed. Output written to OutputProblemA.txt');
//     console.log('Output:', output);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
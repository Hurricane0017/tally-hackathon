const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const getOutput = () => {
  const timelimitFile = path.join(__dirname, '..', 'Docker', 'timelimit.txt');
  const memorylimitFile = path.join(__dirname, '..', 'Docker', 'memorylimit.txt');
  const verdictFile = path.join(__dirname, '..', 'Docker', 'verdict.txt');
  const inputFile = path.join(__dirname, '..', 'Docker', 'input.txt');

  return new Promise((resolve, reject) => {
    // Ensure timelimit.txt exists and contains a value
    let timelimit = '5'; // Default time limit in seconds
    if (fs.existsSync(timelimitFile)) {
      const fileContent = fs.readFileSync(timelimitFile, 'utf8').trim();
      if (fileContent) {
        timelimit = fileContent;
      } else {
        fs.writeFileSync(timelimitFile, timelimit);
      }
    } else {
      fs.writeFileSync(timelimitFile, timelimit);
    }

    // Ensure memorylimit.txt exists and contains a value
    let memorylimit = '128m'; // Default memory limit
    if (fs.existsSync(memorylimitFile)) {
      const fileContent = fs.readFileSync(memorylimitFile, 'utf8').trim();
      if (fileContent) {
        memorylimit = fileContent;
      } else {
        fs.writeFileSync(memorylimitFile, memorylimit);
      }
    } else {
      fs.writeFileSync(memorylimitFile, memorylimit);
    }


    // Command to run the code in Docker
    const runCmd = `docker run --rm --memory=${memorylimit} --cpus="0.5" -v ${path.dirname(verdictFile)}:/sandbox cpp-sandbox code.cpp`;

    // Execute the command
    exec(runCmd, { timeout: parseInt(timelimit) * 1000 }, (err) => {
      // Delete the files
      try {
        if (fs.existsSync(timelimitFile)) {
          fs.unlinkSync(timelimitFile);
        }
        if (fs.existsSync(memorylimitFile)) {
          fs.unlinkSync(memorylimitFile);
        }
      } catch (cleanupErr) {
        console.error('Failed to delete files:', cleanupErr);
      }

      if (err) {
        if (err.killed) {
          // Write "Time Limit Exceeded" to verdict.txt
          fs.appendFileSync(verdictFile, "\nTime Limit Exceeded");
        }
      }

      // Read the final output from verdict.txt
      const finalOutput = fs.readFileSync(verdictFile, 'utf8');

      try {
        fs.writeFileSync(timelimitFile, '');
        fs.writeFileSync(memorylimitFile, '');
        fs.writeFileSync(verdictFile, '');
        fs.writeFileSync(inputFile, '');
      } catch (cleanupErr) {
        console.error('Failed to clear file contents:', cleanupErr);
      }
      resolve({
        success: true,
        type: 'success',
        output: finalOutput,
      });
    });
  });
};

module.exports = getOutput;

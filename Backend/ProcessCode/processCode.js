const fs = require('fs');
const path = require('path');
const getOutput = require('./getOutput'); // Adjust the path as needed
const axios = require('axios');

const processCode = async (req, res) => {
  const { language, code, input, problemId } = req.body;

  const inputFile = path.join(__dirname, '..', 'Docker', 'input.txt');
  const codeFileName = path.join(__dirname, '..', 'Docker', 'code.cpp');
  const memoryLimit = path.join(__dirname, '..', 'Docker', 'memorylimit.txt');
  const timeLimit = path.join(__dirname,'..','Docker', 'timelimit.txt');
  const verdictFile = path.join(__dirname, '..', 'Docker', 'verdict.txt');

  try {
    let problem;
    if (problemId) {
      // Fetch problem details
      problem = await axios.post('http://192.168.172.197:5001/api/problem_detail', { problem_id: problemId });

      let memorylimit = problem.data.memorylimit;
      let timelimit = problem.data.timelimit;

      // Remove "ms" or "s" from the end of the timeLimit string
      timelimit = timelimit.replace(/(ms|s)$/, '');
      
      // Remove "MB" or "mb" from the end of the memoryLimit string
      memorylimit = memorylimit.replace(/(MB|mb)$/, '');

      // Convert the results to numbers
      timelimit = parseFloat(timelimit);
      memorylimit = parseFloat(memorylimit);

      // Convert time limit from milliseconds to seconds if necessary
      if (timelimit > 1000) {
        timelimit = Math.ceil(timelimit / 1000); // Convert to seconds and round up
      }

      // Write only the numeric values to the files
      fs.writeFileSync(memoryLimit, memorylimit.toString());
      fs.writeFileSync(timeLimit, timelimit.toString());
    }

    // Write the input data and code to the respective files
    if (language === 'cpp') {
      if (input) {
        fs.writeFileSync(inputFile, input);
      }

      fs.writeFileSync(codeFileName, code);

      // Call getOutput function which handles compilation and execution
      const output = await getOutput();

      let result;
      if (problemId) {
        // console.log(output.output);
        // console.log(problem.data.output);

        if (problem.data.output.trim() === output.output.trim()) {
          result = { status: "AC", output: output.output };
        } else {
          if (output.type === "TLE") {
            result = { status: "TLE", output: output.output };
          } else if (output.type === "CE") {
            result = { status: "CE", output: output.output };
          } else {
            result = { status: "WA", output: output.output };
          }
        }
      } else {
        result = { status: "Error", output: "Problem ID not provided" };
      }

      // Clean up files
      try {
        fs.writeFileSync(timeLimit, '');
        fs.writeFileSync(memoryLimit, '');
        fs.writeFileSync(verdictFile, '');
        fs.writeFileSync(inputFile, '');
      } catch (cleanupErr) {
        console.error('Failed to clear file contents:', cleanupErr);
      }

      res.status(200).json(result);
    } else {
      res.status(400).send({ error: 'Unsupported language' });
    }
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = processCode;

const fs = require('fs');
const path = require('path');
const getOutput = require('./getOutput'); // Adjust the path as needed
const pool = require("../db");
const query = require("../quaries");

const processCode = async (req, res) => {
  const { language, code, input, problemId } = req.body;

  const inputFileName = path.join(__dirname, '..', 'Docker', 'input.txt');
  const codeFileName = path.join(__dirname, '..', 'Docker', 'code.cpp');

  if (problemId) {
    const problem = await pool.query(query.getProblem, [problemId]);

    let memoryLimit = problem.memorylimit;
    let timeLimit = problem.timelimit;

    // Convert time limit from milliseconds to seconds if necessary
    if (timeLimit > 1000) {
      timeLimit = Math.ceil(timeLimit / 1000); // Convert to seconds and round up
    }

    // Write only the numeric values to the files
    fs.writeFileSync(path.join(__dirname, '..', 'Docker', 'memorylimit.txt'), memoryLimit.toString());
    fs.writeFileSync(path.join(__dirname, '..', 'Docker', 'timelimit.txt'), timeLimit.toString());
  }

  // Write the input data and code to the respective files
  if (language === 'cpp') {
    if(input){
      fs.writeFileSync(inputFileName, input);
    }
    try {
      fs.writeFileSync(codeFileName, code);
      // Call getOutput function which handles compilation and execution
      const output = await getOutput();
      const result = {
        status: output.type,
        output: output.output,
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({ error: 'Error' });
  }
};

module.exports = processCode;

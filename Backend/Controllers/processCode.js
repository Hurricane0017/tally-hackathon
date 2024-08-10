const fs = require('fs');
const path = require('path');
const getOutput = require('./getOutput'); // Adjust the path as needed

const processCode = async (req, res) => {
  const { language, code, type, input } = req.body;

  const inputFileName = path.join(__dirname, '..', 'Files', 'input.txt');
  const codeFileName = path.join(__dirname, '..', 'Files', 'user_code.cpp');

  // Write the input data and code to the respective files
  fs.writeFileSync(inputFileName, input);
  if (language === 'cpp') {
    fs.writeFileSync(codeFileName, code);

    try {
      // Call getOutput function which handles compilation and execution
      const output = await getOutput();
      res.send({ output });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send({ error: 'Unsupported language' });
  }
};

module.exports = processCode;

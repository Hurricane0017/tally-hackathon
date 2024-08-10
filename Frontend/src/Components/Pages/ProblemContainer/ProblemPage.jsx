/* eslint-disable react-hooks/exhaustive-deps */
import { ProblemContainer } from './ProblemContainer';
import classes from './ProblemPage.module.css';
import { useState, useEffect } from 'react';

const ProblemPage = () => {
  const problem = {
    title: "Change A to B",
    description: "Given a string s, change every occurrence of the character 'a' to the character 'b'.",
    rating: "800",
    memoryLimit: "256MB",
    timeLimit: "1000ms",
    inputFormat: "The input consists of a single line containing a string s.",
    outputFormat: "Output the modified string.",
    constraints: "1 <= |s| <= 1000",
    sample: {
      input: "abca",
      output: "bbcb"
    }
  };

  const [problemList, setProblemList] = useState([]);

  useEffect(() => {
    const problems = [];
    for (let i = 0; i < 10; i++) {
      problems.push({ ...problem });
    }
    setProblemList(problems);
  }, []);

  return (
    <div className={classes.problemPage}>
      {problemList.map((problem, serialNumber) => (
        <ProblemContainer problem={problem} serialNumber={serialNumber} key={serialNumber} />
      ))}
    </div>
  );
};

export default ProblemPage;

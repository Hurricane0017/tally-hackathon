import SolveProblem from './Components/SolveProblem/SolveProblem';

const App = () => {
  const problem={
    title:"Change A to B",
    description:"Given a string s, change every occurrence of the character 'a' to the character 'b'.",
    memoryLimit:"256MB",
    timeLimit:"1000ms",
    inputFormat:"The input consists of a single line containing a string s.",
    outputFormat:"Output the modified string.",
    constraints:"1 <= |s| <= 1000",
    sample:{
      input:"abca",
      output:"bbcb"
    }
  }
  return (
    <div>
      <SolveProblem problem={problem}/>
    </div>
  );
};

export default App;

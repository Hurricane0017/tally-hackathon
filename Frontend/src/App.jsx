import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProblemPage from "./Components/Pages/ProblemContainer/ProblemPage"
import HomePage from "./Components/Pages/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import ContestPage from "./Components/Pages/Contest/ContestPage";
import ProfilePage from "./Components/Pages/ProfilePage";
import CodeEditor from './Components/CodeEditor/CodeEditor';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001/api";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemPage />} />
        <Route path="/ide" element={<CodeEditor type="ide"/>}/>
        <Route path="/contest" element={<ContestPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;

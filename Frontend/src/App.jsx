import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProblemPage from "./Components/Pages/ProblemContainer/ProblemPage"
import HomePage from "./Components/Pages/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import ContestPage from "./Components/Pages/ContestPage";
import ProfilePage from "./Components/Pages/ProfilePage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001/api";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/problems" element={<ProblemPage />} />
        <Route path="/contest" element={<ContestPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;

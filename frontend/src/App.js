import "./App.css";
import { Route, Routes } from "react-router-dom";
import Candidates from "./screens/CandidatesScreen";
import Login from "./screens/LoginScreen";
import Results from "./screens/ResultsScreen";
import Voted from "./screens/VotedScreen";
import Admin from "./screens/AdminLoginScreen";
import AdminDashboard from "./screens/AdminDashboardScreen";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/candidates" element={<Candidates />} />
        <Route exact path="/results" element={<Results />} />
        <Route exact path="/voted" element={<Voted />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;

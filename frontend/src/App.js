import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Candidates from "./screens/CandidatesScreen";
import Login from "./screens/LoginScreen";
import Results from "./screens/ResultsScreen";
import Voted from "./screens/VotedScreen";
import Admin from "./screens/AdminLoginScreen";
import AdminDashboard from "./screens/AdminDashboardScreen";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { Mainnet, useEtherBalance, useEthers, Config, useContractCall, useContractFunction} from '@usedapp/core'
import abi from "./smartContract/abi.json"
import { address } from "./smartContract/address"

function App() {
  const { account } = useEthers()
  const wethInterface = new utils.Interface(abi)
  const wethContractAddress = address
  const contract = new Contract(wethContractAddress, wethInterface)

  function PrivateRoute({ children }: { children: JSX.Element }) {
    let location = useLocation();

    if (!account) {
      return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
  }

  function AdminRoute({ children }: { children: JSX.Element }) {
    let location = useLocation();
    const { send } = useContractFunction(contract, 'isAdmin')

    if(!account) {
      return <Navigate to="/admin" state={{ from: location }} />;
    }

    return children;
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/candidates" element={<PrivateRoute> <Candidates /> </PrivateRoute>} />
        <Route exact path="/voted" element={<Voted />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin-dashboard" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />
        <Route exact path="/results" element={<AdminRoute> <Results /> </AdminRoute>} />
      </Routes>
    </>
  );
}

export default App;

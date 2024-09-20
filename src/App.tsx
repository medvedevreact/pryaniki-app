import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { Dashboard } from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

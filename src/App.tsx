import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Form from "./components/Form"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;

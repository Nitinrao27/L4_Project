import {} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './signup'
import Login from './login'
import Question   from  './Questions'
import Run  from './run'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Question" element={<Question />} />
        <Route path="/run" element={<Run />} />
      </Routes>
    </Router>
  );
};

export default App;

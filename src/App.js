import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Postapi from "./Postapi";
import Getapi from "./Getapi";
import Updateapi from "./Updateapi";
import Deleteapi from "./Deleteapi";
import Getoneapi from "./Getoneapi";
function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/postapi" element={<Postapi />} />
          <Route path="/getapi" element={<Getapi />} />
          <Route path="/updateapi" element={<Updateapi />} />
          <Route path="/deleteapi" element={<Deleteapi />} />
          <Route path="/getoneapi" element={<Getoneapi />} />

        </Routes>
      </div>
    </Router>

  );
}

export default App;

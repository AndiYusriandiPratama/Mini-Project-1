import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./component/MainPage/MainPage";
import CreateEvents from "./component/MainPage/CreateEvent";
import Navbar from "./component/Navbar/navbar";
import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <MainPage /> */}
        <Navbar />
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/create-events" element={<CreateEvents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

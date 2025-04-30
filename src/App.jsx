import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePosts";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/createPosts' element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

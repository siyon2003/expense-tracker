import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import Transaction from "./pages/Transaction/Transaction";
import Dashboard from "./pages/DashBoard/Dashboard";
import AuthProtectedSign from "./components/AuthProtectedSign/AuthProtectedSign";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthProtectedSign />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          {/* <Route path='/profile' element={<Profile />}/>
      <Route path='/about' element={<About />}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

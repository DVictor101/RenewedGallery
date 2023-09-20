import "./App.css";
import HomePage from "./Pages/Homepage/homePage";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignInPage/SignIn";
import SignUp from "./Pages/SignUp/SignUp";

function App() {
 return (
  <div className="App">
   <Routes>
    <Route
     index="true"
     path="/"
     element={<HomePage />}
    />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
   </Routes>
  </div>
 );
}

export default App;

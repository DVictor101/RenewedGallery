import "./App.css";
import HomePage from "./Pages/Homepage/homePage";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignInPage/SignIn";

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
   </Routes>
  </div>
 );
}

export default App;

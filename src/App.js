import "./App.css";
import HomePage from "./Pages/Homepage/homePage";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignInPage/SignIn";

function App() {
 return (
  <div className="App">
   <Routes>
    <Route path="/" element={<SignIn />} />
    <Route
     index="true"
     path="/homepage"
     element={<HomePage />}
    />
   </Routes>
  </div>
 );
}

export default App;

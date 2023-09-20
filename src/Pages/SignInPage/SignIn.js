import "./signin.scss";
import { useState } from "react";
import {
 getAuth,
 signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../Firebase";

const auth = getAuth(app);

const SignIn = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState(null);
 const navigate = useNavigate();

 const handleSignIn = async (e) => {
  e.preventDefault();

  try {
   if (
    email === "user@example.com" &&
    password === "1Password"
   ) {
    await signInWithEmailAndPassword(
     auth,
     email,
     password
    );
    setError(null);
    navigate("/");

    setEmail("");
    setPassword("");
   } else {
    setError(
     `Access not granted. Only use permitted login details.`
    );
   }
  } catch (error) {
   console.error("Error signing in:", error);
   setError(
    "Authentication failed. Please enter the correct UserName and Password."
   );

   setEmail("");
   setPassword("");
  }
 };

 return (
  <div className="signin_cont">
   <div className="signin">
    <form
     className="signinform"
     onSubmit={handleSignIn}
    >
     <label className="signin_text">Email</label>
     <input
      type="email"
      placeholder="myemail@gmail.com"
      className="input"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     />
     <label className="signin_text">
      Password
     </label>
     <input
      type="password"
      placeholder="Enter Password"
      className="input"
      value={password}
      onChange={(e) =>
       setPassword(e.target.value)
      }
     />
     <button
      type="submit"
      className="custom-button modi-btn"
     >
      LOG In
     </button>
     {error && (
      <p className="error-text">{error}</p>
     )}
    </form>
   </div>
  </div>
 );
};

export default SignIn;

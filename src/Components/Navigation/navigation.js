import "./navigation.scss";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"; // Assuming you are using Firebase v9
import { auth } from "../../Firebase";


const Navigation = () => {
 const [user] = useAuthState(auth);

 return (
  <div className="nav">
   <div className="title_div"><h1>RENEWEDGALLERY</h1></div>
   {!user ? (
    <div>
     <Link className="btnlink" to={`/signin`}>
      <button className="custom-button">
       SIGN IN
      </button>
     </Link>
    </div>
   ) : null}
  </div>
 );
};

export default Navigation;

import { SignIn } from "@clerk/clerk-react";
import { useState, useRef } from "react";
function Login(props) {
  const [showPopup, setShowPopup] = useState(false);
  const catMenu = useRef(null)
  const closeOpenPopup = (e)=>{
    if(catMenu.current && showPopup && !catMenu.current.contains(e.target)){
        setShowPopup(false)
    }
}
document.addEventListener('mousedown', closeOpenPopup)
  return (
    <>
      <button disabled={showPopup} className="login-button" onClick={() => setShowPopup((prevState) => !prevState)}>
        Log in
      </button>
      {showPopup && (
        <div ref={catMenu} className="login-popup">
            <button onClick={() => setShowPopup((prevState) => !prevState)} className="login-popup-close"></button>
          <SignIn redirectUrl="/quizzical-react/" />
        </div>
      )}
    </>
  );
}

export default Login;

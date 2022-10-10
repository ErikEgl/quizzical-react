import { useClerk } from "@clerk/clerk-react";
import { UserContext } from "../../utils/useContext";
import { useState, useContext, useEffect } from "react";
const SignOut = () => {
  const { signingOut, setSigningOut } = useContext(UserContext);

  const { signOut } = useClerk();
  function clickHandler() {
    setSigningOut(prevState => !prevState)
    signOut()
    setTimeout(() => {
      setSigningOut(prevState => !prevState)
    }, 5000)
  }
  return (
    <button onClick={() => signOut()} >
      Sign out
    </button>
  );
};

export default SignOut
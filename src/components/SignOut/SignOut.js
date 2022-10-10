import { useClerk } from "@clerk/clerk-react";
import { UserContext } from "../../utils/useContext";
import { useContext } from "react";
const SignOut = () => {
  const { setGamePossessionsData } = useContext(UserContext);

  const { signOut } = useClerk();
  function clickHandler() {
    signOut()
    setGamePossessionsData({
      gems: 50,
    })
  }
  return (
    <button onClick={() => clickHandler()} >
      Sign out
    </button>
  );
};

export default SignOut
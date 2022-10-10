import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../utils/useContext";
function GamePointsCounter({isSignedIn}) {
  const { gamePossessionsData, correctAnswersCounter, setGamePossessionsData } = useContext(UserContext);
  const [showEarnedGems, setShowEarnedGems] = useState(false)



  useEffect(() => {
    if(!!correctAnswersCounter) {
      setShowEarnedGems(prevState => !prevState)
      setTimeout(() => {
        setShowEarnedGems(prevState => !prevState)
      }, 700)
    }
  }, [!!correctAnswersCounter])

  useEffect(() => {
    if(!isSignedIn)  { 
      console.log("gems from localstorage");
      if(gamePossessionsData.gems !== 50) return;
      setGamePossessionsData({
        gems: 50,
      })
    } else {
      console.log("gems from database");
    }
  }, [isSignedIn])

  console.log("isSignedIn: ", isSignedIn);
  console.log("gamePossessionsData: ", gamePossessionsData);
  return (
    <>
      <div className="points-counter">
        <small>
          Gems: {gamePossessionsData.gems}💎
          <span className={`${showEarnedGems ? " slide-and-fade" : ''}`}>
            {showEarnedGems && `+ ${+correctAnswersCounter}💎`}
          </span>
        </small>
      </div>
    
    </>
  );
}

export default GamePointsCounter;

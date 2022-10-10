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

import React, { useContext } from "react";
import { UserContext } from "../../utils/useContext";
function GamePointsCounter(props) {
  const { gamePossessionsData, showUserErrorMessage } = useContext(UserContext);
  return (
    <>
      <div className="points-counter">
        <small>Gems: {gamePossessionsData.gems}💎</small>
      </div>
    
    </>
  );
}

export default GamePointsCounter;

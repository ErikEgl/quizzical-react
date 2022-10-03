import React, { useContext } from "react";
import { UserContext } from "../../utils/useContext";
function GamePointsCounter(props) {
  const { } = useContext(UserContext);
  return (
    <>
    <div className="points-counter">Gems: 10💎</div>
    </>
  );
}

export default GamePointsCounter;

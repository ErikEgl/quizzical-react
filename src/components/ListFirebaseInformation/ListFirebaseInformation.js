import {  useEffect, useContext } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { UserContext } from "../../utils/useContext";
import { db } from "../../firebase";
import { useUser } from "@clerk/clerk-react";

function ListFirebaseInformation() {
  const {
    gamePossessionsData,
    setGamePossessionsData,
    gameEnd,
  } = useContext(UserContext);
  const { isLoaded, isSignedIn, user } = useUser();


  useEffect(() => {
    if (isSignedIn && isLoaded) {
      getUserGameData();
      return
    }
  }, [isSignedIn, isLoaded]);

  useEffect(() => {
    if (isSignedIn && isLoaded && gameEnd) {
      const userRef = doc(db, "users", user.id);
      setDoc(userRef, { gems: +gamePossessionsData.gems }, { merge: true });
    }
  }, [gameEnd]);

  async function getUserGameData() {
    const docSnap = await getDoc(doc(db, "users", user.id));
    if (docSnap.exists()) {
      if (docSnap.data().gems) {
        setGamePossessionsData({gems: +docSnap.data().gems});
      }
    }
  }
}

export default ListFirebaseInformation;

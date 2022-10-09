import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAlK6_oPhh3ZgtqduyVhBz4rxkLg4VmsE",
  authDomain: "quizzical-react-260e4.firebaseapp.com",
  databaseURL:
    "https://quizzical-react-260e4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quizzical-react-260e4",
  storageBucket: "quizzical-react-260e4.appspot.com",
  messagingSenderId: "326887538180",
  appId: "1:326887538180:web:21858bd5562d271333bf51",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

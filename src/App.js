import Page from "./components/Page/Page";
import Blob from "./components/Blob/Blob";
import GamePointsCounter from "./components/GamePointsCounter/GamePointsCounter";
import ListFirebaseInformation from "./components/ListFirebaseInformation/ListFirebaseInformation";
import {  
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn
 } from "@clerk/clerk-react";
 import { useUser } from "@clerk/clerk-react";
import Login from "./components/Login/Login";
const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {

  return (
    <>
    <ClerkProvider frontendApi={frontendApi}>
      <SignedIn>
        <MainApp />
        <ListFirebaseInformation />
      </SignedIn>
      <SignedOut>
        <Login />
        <MainApp />
      </SignedOut>
    </ClerkProvider>
      
    </>
  );
}
function MainApp() {
  const { isSignedIn } = useUser();

  return (
    <main style={{padding: "20px 40px"}}>
      <Blob color={"yellow"}/>
      <GamePointsCounter isSignedIn={isSignedIn} />
      <Page />
      <Blob color={"blue"}/>
    </main>
  );
}
export default App;



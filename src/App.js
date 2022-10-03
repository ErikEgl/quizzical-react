import Page from "./components/Page/Page";
import Blob from "./components/Blob/Blob";
import GamePointsCounter from "./components/GamePointsCounter/GamePointsCounter";

function App() {
  return (
    <>
      <main>
        <Blob color={"yellow"}/>
        <GamePointsCounter />
        <Page />
        <Blob color={"blue"}/>
      </main>
      
    </>
  );
}

export default App;

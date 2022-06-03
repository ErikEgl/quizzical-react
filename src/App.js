import Page from "./components/Page/Page";
import Blob from "./components/Blob/Blob";

function App() {
  return (
    <>
      <main>
        <Blob color={"yellow"}/>
        <Page />
        <Blob color={"blue"}/>
      </main>
      
    </>
  );
}

export default App;

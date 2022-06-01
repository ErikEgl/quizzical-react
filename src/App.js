import FirstPage from "./components/FirstPage/FirstPage";
import Blob from "./components/Blob/Blob";

function App() {
  return (
    <>
      <main>
        <Blob color={"yellow"}/>
        <FirstPage />
        <Blob color={"blue"}/>
      </main>
      
    </>
  );
}

export default App;

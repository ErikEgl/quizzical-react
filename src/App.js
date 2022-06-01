import FirstPage from "./components/FirstPage/FirstPage";
import Blob from "./components/Blob/Blob";

function App() {
  return (
    <>
      <Blob color={"yellow"}/>
      <FirstPage />
      <Blob color={"blue"}/>
    </>
  );
}

export default App;

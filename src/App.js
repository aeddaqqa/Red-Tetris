import "./App.css";
import Tetris from "./components/Tetris";
import { createStage } from "./utils/gameHelpers";

function App() {
  // console.log(createStage());
  return (
    <div className="App">
      <h1>
        red <span>tetris</span>
      </h1>
      <Tetris />
    </div>
  );
}

export default App;

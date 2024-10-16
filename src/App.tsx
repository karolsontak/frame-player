import bird from "./assets/the-bird.png";
import bird1 from "./assets/first-bird.png";
import bird2 from "./assets/second-bird.png";
import bird3 from "./assets/third-bird.png";
import bird4 from "./assets/fourth-bird.png";
import bird5 from "./assets/fifth-bird.png";
import { Player } from "./components/Player";

function App() {
  return (
    <div className="flex justify-center">
      <Player frames={[bird, bird1, bird2, bird3, bird4, bird5]} fps={0.2} />
    </div>
  );
}

export default App;

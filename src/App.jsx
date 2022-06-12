import { useRef } from "react";
import { motion } from "framer-motion";
import Window from "./Component/Window";
import Terminal from "./Component/Terminal";
import './App.css';

function App() {
  const constraintsRef = useRef(null);

  return (
    <div id="App" >
      <div id="Monitor">
        <div id="MenuBar">File About</div>
        <motion.div id="Desktop" ref={constraintsRef}>
          <Window title={'Satyam Mishra | Portfolio'} dragComp={constraintsRef}>
            <Terminal></Terminal>
          </Window>
        </motion.div>
      </div>
    </div>
  );
}

export default App;

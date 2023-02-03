import { useRef, createContext } from "react";
import { motion } from "framer-motion";
import Terminal from "./Component/Terminal";
import Browser from "./Component/Browser";
import './App.css';

// design right click menu too

export const DesktopContext = createContext();

function App() {
  const constraintsRef = useRef(null);

  return (
    <div id="App" >
      <div id="Monitor">
        <div id="MenuBar">File About</div>
        <motion.div id="Desktop" ref={constraintsRef}>
          <DesktopContext.Provider value={constraintsRef}>
            <Terminal></Terminal>
            
          </DesktopContext.Provider>
        </motion.div>
      </div>
    </div>
  );
}

export default App;

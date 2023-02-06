import { useEffect, useRef, useState, cloneElement, createContext} from "react";
import Terminal from "./Component/Terminal";
import Browser from "./Component/Browser";
import OSIco from "./images/os.png"
import CalculatorIco from "./images/Window/calculator.webp"
import FinderIco from "./images/Window/finder.webp"
import GalleryIco from "./images/Window/gallery.webp"
import GithubIco from "./images/Window/github.webp"
import StoreIco from "./images/Window/store.webp"
import TerminalIco from "./images/Window/terminal.png"
import './App.css';


// design right click menu too

export const DesktopContext = createContext();

function Dock() {
    return (
        <div className="Dock">
            <div className="DockItem">
                <img src={FinderIco} alt="FinderIco" />
                <div className="TaskDot RunningTaskDot"></div>
            </div>
            <div className="DockSeparator"></div>
            <div className="DockItem">
                <img src={TerminalIco} alt="TerminalIco" />
                <div className="TaskDot RunningTaskDot"></div>
            </div>
            <div className="DockItem">
                <img src={GithubIco} alt="GithubIco" />
                <div className="TaskDot StandbyTaskDot"></div>
            </div>
            <div className="DockItem">
                <img src={GalleryIco} alt="GalleryIco" />
            </div>
            <div className="DockItem">
                <img src={StoreIco} alt="StoreIco" />
            </div>
            <div className="DockItem">
                <img src={CalculatorIco} alt="CalculatorIco" />
            </div>
        </div>
    );
}

function App() {
    const constraintsRef = useRef(null);
    const [time, setTime] = useState(new Date());
    const [windows, setWindows] = useState([
        { name: "Terminal", component: <Terminal/>, status: 'active' }
    ]);
    const [maxZIndex, setMaxZIndex] = useState(1);

    const DispatchWindowAction = (id, action, payload) => {
        if(action === 'create')
        {
            setWindows([...windows, {name: payload.name, component: cloneElement(payload.component, {id: windows.length}), status: 'active'}]);
        }
        else if(action ===  'close')
        {
            if(id < 0 || id >= windows.length) return;
            setWindows(windows.filter((window, index) => index !== id));
        } else if(action === 'minimise')
        {
            if(id < 0 || id >= windows.length) return;
            setWindows(windows.map((window, index) => {
                if(index === id)
                {
                    return {...window, status: 'minimised'};
                }
                return window;
            }));
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="App" >
            <div id="Monitor">
                <div id="MenuBar">
                    <div className="MenuBarLeft">
                        <div id="OSIco">
                            <img src={OSIco} alt="OSIco" />
                        </div>
                        <div className="RunningTask">
                            Finder
                        </div>
                        <div className="MenuBarLeftItem">
                            File
                        </div>
                        <div className="MenuBarLeftItem">
                            Edit
                        </div>
                        <div className="MenuBarLeftItem">
                            View
                        </div>
                        <div className="MenuBarLeftItem">
                            Go
                        </div>
                        <div className="MenuBarLeftItem">
                            Window
                        </div>
                        <div className="MenuBarLeftItem">
                            Help
                        </div>
                    </div>
                    <div className="MenuBarRight">
                        <div className="MenuBarRightItem">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 351 348">
                                <path stroke="currentColor" d="M87.75 46.2c9.31 0 18.237 3.245 24.819 9.021 6.583 5.776 10.281 13.61 10.281 21.779s-3.698 16.003-10.281 21.779c-6.582 5.776-15.51 9.021-24.819 9.021-9.31 0-18.237-3.245-24.82-9.021C56.349 93.003 52.65 85.169 52.65 77s3.698-16.003 10.28-21.779c6.583-5.776 15.51-9.021 24.82-9.021zM263.25 0c23.273 0 45.592 8.112 62.049 22.553C341.755 36.993 351 56.578 351 77c0 20.422-9.245 40.007-25.701 54.447C308.842 145.888 286.523 154 263.25 154H87.75c-23.273 0-45.592-8.112-62.049-22.553C9.245 117.007 0 97.422 0 77c0-20.422 9.245-40.007 25.701-54.447C42.158 8.113 64.477 0 87.75 0h175.5zM87.75 30.8c-13.964 0-27.355 4.867-37.23 13.532C40.648 52.996 35.1 64.747 35.1 77s5.547 24.004 15.42 32.668c9.875 8.665 23.266 13.532 37.23 13.532h175.5c13.964 0 27.355-4.867 37.229-13.532C310.353 101.004 315.9 89.253 315.9 77s-5.547-24.004-15.421-32.668C290.605 35.667 277.214 30.8 263.25 30.8H87.75zM263.25 194H87.75c-23.273 0-45.592 8.112-62.049 22.553C9.245 230.993 0 250.578 0 271c0 20.422 9.245 40.007 25.701 54.447C42.158 339.888 64.477 348 87.75 348h175.5c23.273 0 45.592-8.112 62.049-22.553C341.755 311.007 351 291.422 351 271c0-20.422-9.245-40.007-25.701-54.447C308.842 202.112 286.523 194 263.25 194v0zm0 123.2c-13.964 0-27.355-4.867-37.229-13.532-9.874-8.664-15.421-20.415-15.421-32.668s5.547-24.004 15.421-32.668c9.874-8.665 23.265-13.532 37.229-13.532 13.964 0 27.355 4.867 37.229 13.532 9.874 8.664 15.421 20.415 15.421 32.668s-5.547 24.004-15.421 32.668c-9.874 8.665-23.265 13.532-37.229 13.532z">
                                </path>
                            </svg>
                        </div>
                        <div className="MenuBarRightItem">
                            {
                                `${time.toString().split(" ")[0].slice(0, 3)} ${time.toString().split(" ")[1]} ${time.toString().split(" ")[2]}`
                            }
                        </div>
                        <div className="MenuBarRightItem">
                            {
                                `${time.toString().split(" ")[4].split(":")[0] > 12 ? time.toString().split(" ")[4].split(":")[0] - 12 : time.toString().split(" ")[4].split(":")[0]}:${time.toString().split(" ")[4].split(":")[1]} ${time.toString().split(" ")[4].split(":")[0] > 12 ? "PM" : "AM"}`
                            }
                        </div>
                    </div>
                </div>
                <div id="Desktop" ref={constraintsRef}>
                    <DesktopContext.Provider value={{constraintsRef, maxZIndex, setMaxZIndex, DispatchWindowAction}}>
                        { windows.map((window, index) => {return cloneElement(window.component, {key:index, idx:index});}) }
                    </DesktopContext.Provider>
                </div>
                <div className="DockContainer"><Dock /></div>
                
            </div>
        </div>
    );
}

export default App;

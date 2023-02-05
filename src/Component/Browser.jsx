import { useRef } from "react";
import Window from "./Window";
import bubbleIframeEvents from "../tools/BubbleIframeEvents";
import "../stylesheets/Window.css";
import "../stylesheets/Browser.css"
import TabIco from "../images/Safari/tabs.png"
import BackIco from "../images/Safari/back.png"
import ForwardIco from "../images/Safari/forward.png"
import ShareIco from "../images/Safari/share.png"
import AddIco from "../images/Safari/add.png"
import LayersIco from "../images/Safari/layers.png"

function Browser({idx, command='launch', metadata={siteURL: 'https://sam-1210.github.io/'}}) {
    const BrowserRef = useRef(null);
    const iFrameRef = useRef(null);

    const TitleBar = <div className="TitleBar">
        <div className="TitleBarLeft">
            <div className="WindowControlsOccupied"></div>
            <div>
                <img src={TabIco} alt="TabIco" />
                <img src={BackIco} alt="BackIco" />
                <img src={ForwardIco} alt="ForwardIco" />
            </div>
        </div>
        <div className="SearchContainer">
            <div>Search</div>
        </div>
        <div>
            <img src={ShareIco} alt="Share" />
            <img src={AddIco} alt="Add" />
            <img src={LayersIco} alt="Layers" />
        </div>
    </div>

    return (
        <Window idx={idx} title={'Browser'} CustomTitleBar={TitleBar} startInFullScreen={true}>
            <div className="Browser" ref={BrowserRef}>
                <iframe is="x-frame-bypass" src={metadata.siteURL} 
                    title="Browser" 
                    style={{width: '100%', height: '100%', margin: 0}} 
                    ref={iFrameRef}
                    onLoad={e=>bubbleIframeEvents(iFrameRef.current, BrowserRef.current, 'mousedown')} 
                />
            </div>
        </Window>
    );
}

export default Browser;
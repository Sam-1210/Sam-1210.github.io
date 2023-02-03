import { useEffect, useState } from "react";
import Window from "./Window";
import "../stylesheets/Window.css";
import "../stylesheets/Browser.css"
import TabIco from "../images/Safari/tabs.png"
import BackIco from "../images/Safari/back.png"
import ForwardIco from "../images/Safari/forward.png"
import ShareIco from "../images/Safari/share.png"
import AddIco from "../images/Safari/add.png"
import LayersIco from "../images/Safari/layers.png"

function Browser({command='launch', metdata={siteURL: 'https://sam-1210.github.io/'}}) {
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
        <Window title={'Browser'} CustomTitleBar={TitleBar}>
            <div className="Browser">
                <iframe is="x-frame-bypass" src={metdata.siteURL} title="Browser" style={{width: '100%', height: '100%', margin: 0}} frameBorder={0}/>
            </div>
        </Window>
    );
}

export default Browser;
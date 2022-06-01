import { useEffect, useRef, useState } from "react";
import Navigate from "./Navigate";
import Help from "./Help";
import "../stylesheets/Terminal.css"




function AboutSatyam(props) {
    const setCode = e => {
        props.CommandReader.value = e.target.innerHTML
    };
    return (
        <div>
            <div className="CommandLine">
                <label>anonymous@satyam-portfolio ~ $</label>
                <input type="text" value={"echo about_satyam.rtf"} disabled={true} />
            </div>
            <div className="AboutSatyamContainer">
                <div className="AboutSatyam">
                    <h2>Hi,</h2>
                    <h1>I'm Satyam Mishra</h1>
                    <h3>Software Developer</h3>
                    <h4>A Computer Science Student, based in Delhi, India. Exploring the field of Software Development and Looking towards Exploring the Industry.</h4>
                    <a href="linked.com">linkedin</a>
                    <h5>To Get Help With Navigation, Type 
                        <code onClick={setCode}>man navigate</code>or 
                        <code onClick={setCode}>navigate gui</code> to navigate using GUI
                    </h5>
                </div>
                <div className="SatyamDP">
                    <img src={require('../images/profilePhoto.jpg')} alt="Satyam Mishra" />
                </div>
            </div>
        </div>
    );
}

function counter(initial = 0, prefix = '') {
    let index = initial;
    return {
        next: () => prefix + String(++index),
        prev: () => prefix + String(index > 0 ? --index : 0),
        current: () => prefix + String(index)
    };
}

export default function Terminal(props) {
    const CommandReader = useRef(null);
    const [terminalHistory, setTerminalHistory] = useState([]);
    const [HistoryElements, setHistoryElements] = useState([]);
    const [elementsKey] = useState(counter(1, 'History'));
    const [HistoryIterator] = useState(counter(1));

    useEffect(()=>{
        setTerminalHistory(['echo about_satyam.rtf']);
        setHistoryElements([<AboutSatyam key={"History0"} CommandReader={CommandReader.current}/>]);
    }, [])

    const ExecuteCommand = command => {
        command.toLowerCase();
        let tokens = command.split(' ');
        let firstToken = tokens.shift();
        switch (firstToken) {
            case 'man':
                return <Help args={tokens}/>;
            case 'navigate':
                return <Navigate args={tokens} /> 
            default:
                return <div className='UnknownCmd'>Oh oo! Command not recogonised.</div>;
        }
    };

    const getCommand = e => {
        if (e.key === 'Enter') {
            let command = e.target.value;
            e.target.value = '';
            HistoryIterator.next();
            setTerminalHistory([...terminalHistory, command]);
            setHistoryElements([...HistoryElements,
            <div key={elementsKey.next()}>
                <div className="CommandLine">
                    <label>anonymous@satyam-portfolio ~ $</label>
                    <input type="text" value={command} disabled={true} />
                </div>
                {ExecuteCommand(command)}
            </div>]);

            
        } else if (e.key === 'ArrowUp') {
            e.target.value = terminalHistory[HistoryIterator.prev()];
        } else if (e.key === 'ArrowDown') {
            if (HistoryIterator.current() < terminalHistory.length - 1)
                e.target.value = terminalHistory[HistoryIterator.next()];
        }
    }

    useEffect(()=>{
        if(CommandReader)
            CommandReader.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    },[terminalHistory]);

    return (
        <div onClick={e=>CommandReader.current.focus()}>
            {HistoryElements}
            <div className="CommandLine">
                <label>anonymous@satyam-portfolio ~ $</label>
                <input type="text"  disabled={false} onKeyUp={getCommand} autoFocus={true} ref={CommandReader}/>
            </div>
        </div>
    );
}
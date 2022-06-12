import { useEffect, useRef, useState } from "react";
import Navigate from "./Navigate";
import AboutMe from "./AboutMe";
import Help from "./Help";
import "../stylesheets/Terminal.css"


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

    useEffect(() => {
        setTerminalHistory(['cat about_satyam.rtf']);
        setHistoryElements([<AboutMe key={"History0"} CommandReader={CommandReader.current} />]);
    }, [])

    const ExecuteCommand = command => {
        command = command.toLowerCase();
        let tokens = command.split(' ');
        let firstToken = tokens.shift();
        switch (firstToken) {
            case 'man':
                return <Help args={[...tokens]} />;
            case 'navigate':
                return <Navigate args={[...tokens]} CommandReader={{ element: CommandReader.current, execute: getCommand }} />
            case 'cat':
                return <div>That's Just way too ahhhh, ignore.</div>
            default:
                return <div className='UnknownCmd'>Oh oo! Command not recogonised.</div>;
        }
    };

    const getCommand = e => {
        if (e.type === 'click' || e.key === 'Enter') {
            let command = e.target.value;
            
            if (e.type === 'click') {
                let tokens = command.split(' ');
                let firstToken = tokens.shift();
                if (firstToken === 'easterRun')
                    command = command.substring(firstToken.length + 1, command.length)
                else
                    return;
            }
            
            e.target.value = '';

            HistoryIterator.next();
            setTerminalHistory([...terminalHistory, command]);
            setHistoryElements([...HistoryElements,
            <div key={elementsKey.next()}>
                <div className="CommandLine">
                    <label>anonymous@satyam-portfolio ~ $</label>
                    <div>{command}</div>
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

    useEffect(() => {
        if (CommandReader)
            CommandReader.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [terminalHistory]);

    return (
        <div className='Terminal'
            onClickCapture={e => { CommandReader.current.focus() }}
        >
            {HistoryElements}
            <div className="CommandLine">
                <label>anonymous@satyam-portfolio ~ $</label>
                <input type="text"
                    onKeyUp={getCommand}
                    autoFocus={true} ref={CommandReader}
                    onClick={getCommand} />
            </div>
        </div>
    );
}
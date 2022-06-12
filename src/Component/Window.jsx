import { motion, useDragControls } from "framer-motion";
import { useRef } from "react";
import "../stylesheets/Window.css"

export default function Window(props) {
    const dragControls = useDragControls();
    const bodyRef = useRef(null);

    return (
        <motion.div className="Window"
            drag
            dragConstraints={props.dragComp}
            dragElastic={0}
            dragMomentum={false}
            dragControls={dragControls}
            dragListener={false}
            
        >
            <div className="WindowlHead" 
                onPointerDown={e => dragControls.start(e)}
                onMouseDown={e => e.target.ariaSelected = 'true'}
                onMouseUp={e => e.target.ariaSelected = 'false'}
                onMouseLeave={e => e.target.ariaSelected = 'false'}
                onClick={e=>bodyRef.current ? bodyRef.current.click() : null}
            >
                <div className="WindowControls WinControl">
                    <div className="WinControlClose WinControl"></div>
                    <div className="WinControlResize WinControl"></div>
                    <div className="WinControlMinimize WinControl"></div>
                </div>
                <div className="WindowTitle">
                    {props.title}
                </div>
            </div>
            <div className="WindowBody" onClick={e=>e.target === bodyRef.current && e.target.firstChild  ? e.target.firstChild.click() : null} ref={bodyRef}>
                {props.children}
            </div>
        </motion.div>
    );
}
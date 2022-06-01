import { motion, useDragControls } from "framer-motion";
import "../stylesheets/Window.css"

export default function Window(props) {
    const dragControls = useDragControls();

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
            <div className="WindowBody" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onMouseMove={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </motion.div>
    );
}
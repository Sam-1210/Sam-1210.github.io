import { useRef, useContext } from "react";
import { DesktopContext } from "../App";
import "../stylesheets/Window.css"
import { useEffect } from "react";

export default function Window({title, children, draggable=true}) {
    const bodyRef = useRef(null);
    const dragHandle = useRef(null);
    const WindowRef = useRef(null);
    const desktopRef = useContext(DesktopContext);
    
    useEffect(() => {
        if(WindowRef.current !== null) {
            const element = WindowRef.current;
            element.addEventListener('resize', (e) => {
                const {x: WinX, y: WinY} = WindowRef.current.getBoundingClientRect();
                const { width, height } = e.detail;
                let {x: DesktopX, y: DesktopY, width: maxX, height: maxY} = desktopRef.current.getBoundingClientRect();
                maxX -= WinX - DesktopX;
                maxY -= WinY - DesktopY;
                WindowRef.current.style.width = Math.min(width, maxX) + "px";
                WindowRef.current.style.height = Math.min(height, maxY) + "px";
            });
            function checkResize(mutations) {
                const el = mutations[0].target;
                const w = el.clientWidth;
                const h = el.clientHeight;

                const isChange = mutations
                    .map((m) => `${m.oldValue}`)
                    .some((prev) => prev.indexOf(`width: ${w}px`) === -1 || prev.indexOf(`height: ${h}px`) === -1);

                if (!isChange) { return; }
                const event = new CustomEvent('resize', { detail: { width: w, height: h } });
                el.dispatchEvent(event);
            }
            const observer = new MutationObserver(checkResize);
            observer.observe(element, { attributes: true, attributeOldValue: true, attributeFilter: ['style'] });
        }

    }, [WindowRef]);

    useEffect(() => {
        if(WindowRef.current !== null) {
            const {width: WindowWidth, height: WindowHeight} = WindowRef.current.getBoundingClientRect();
            let {x: DesktopX, y: DesktopY, width: maxX, height: maxY} = desktopRef.current.getBoundingClientRect();
            if(WindowRef.current.offsetLeft < DesktopX) WindowRef.current.style.left = DesktopX + "px";
            if(WindowRef.current.offsetTop < DesktopY) WindowRef.current.style.top = DesktopY + "px";
            WindowRef.current.style.width = Math.min(WindowWidth, maxX) + "px !important";
            WindowRef.current.style.height = Math.min(WindowHeight, maxY) + "px !important";
        }

    }, [bodyRef, dragHandle, WindowRef, desktopRef]);

    const drag = e => {
        if (draggable === true ) {
            e.target.ariaSelected = 'true';

            let InitialMouseX = e.clientX;
            let InitialMouseY = e.clientY;
            const {width: WindowWidth, height: WindowHeight} = WindowRef.current.getBoundingClientRect();
            let {x: DesktopX, y: DesktopY, width: maxX, height: maxY} = desktopRef.current.getBoundingClientRect();
            maxX -= WindowWidth - DesktopX;
            maxY -= WindowHeight - DesktopY;

            
            const move = e => {
                e = e || window.event;
                let DraggedMouseX, DraggedMouseY;
                if (e.type === 'touchmove') {
                    DraggedMouseX = InitialMouseX - e.touches[0].clientX;
                    DraggedMouseY = InitialMouseY - e.touches[0].clientY;
                    InitialMouseX = e.touches[0].clientX;
                    InitialMouseY = e.touches[0].clientY;
                } else {
                    e.preventDefault();
                    DraggedMouseX = InitialMouseX - e.clientX;
                    DraggedMouseY = InitialMouseY - e.clientY;
                    InitialMouseX = e.clientX;
                    InitialMouseY = e.clientY;
                }
                WindowRef.current.style.left = Math.min(Math.max(WindowRef.current.offsetLeft - DraggedMouseX, DesktopX), maxX) + "px";
                WindowRef.current.style.top = Math.min(Math.max(WindowRef.current.offsetTop - DraggedMouseY, DesktopY), maxY) + "px";
            }
            
            const up = e => {
                if(e.type === 'touchend') {
                    document.removeEventListener('touchmove', move);
                    document.removeEventListener('touchend', up);
                } else {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', up);
                }
            }

            if(e.type === 'touchstart')
            {
                document.addEventListener('touchmove', move);
                document.addEventListener('touchend', up);
            } else {
                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', up);
            }
        }
    }

    return (
        <div className="Window" ref={WindowRef}>
            <div className="WindowlHead" 
                onMouseDown={drag}
                onTouchStart={drag}
                onMouseUp={e => e.target.ariaSelected = 'false'}
                onMouseLeave={e => e.target.ariaSelected = 'false'}
                onClick={e=>bodyRef.current ? bodyRef.current.click() : null}
                ref={dragHandle}
            >
                <div className="WindowControls WinControl">
                    <div className="WinControlClose WinControl"></div>
                    <div className="WinControlResize WinControl"></div>
                    <div className="WinControlMinimize WinControl"></div>
                </div>
                <div className="WindowTitle">
                    {title}
                </div>
            </div>
            <div className="WindowBody" onClick={e=>e.target === bodyRef.current && e.target.firstChild  ? e.target.firstChild.click() : null} ref={bodyRef}>
                {children}
            </div>
        </div>
    );
}
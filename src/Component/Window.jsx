import { useRef, useContext, useEffect, useState } from "react";
import { DesktopContext } from "../App";
import "../stylesheets/Window.css"


export default function Window({idx, title = 'Window', children, draggable = true, 
        ShowWindowControls = true, CustomTitleBar = null, 
        DisableClose=(idx===0), DisableMinimise=false, DisableReisze=false,
        startInFullScreen=false    
    },) {
    const bodyRef = useRef(null);
    const dragHandle = useRef(null);
    const WindowRef = useRef(null);
    const [WindowDimensions, setWindowDimensions] = useState(null);
    const [Mode, setMode] = useState(startInFullScreen ? 'full' : 'normal');
    const {constraintsRef:desktopRef, maxZIndex, setMaxZIndex, DispatchWindowAction} = useContext(DesktopContext);

    useEffect(() => {
        if(WindowRef !== null)
        {
            WindowRef.current.style.zIndex = maxZIndex;
            setMaxZIndex(maxZIndex + 1);
        }
    }, []);

    useEffect(() => {
        if(WindowRef !== null)
        {
            WindowRef.current.style.zIndex = maxZIndex;
            setMaxZIndex(maxZIndex + 1);
            if(startInFullScreen === true) {
                WindowRef.current.style.width = "100%";
                WindowRef.current.style.height = "calc(100% - 80px)";
                WindowRef.current.style.top = "0px";
                WindowRef.current.style.left = "0px";
            } else {
                WindowRef.current.style.width = "60%";
                WindowRef.current.style.height = "70%";
                const { width: WindowWidth, height: WindowHeight } = WindowRef.current.getBoundingClientRect();
                let { width: DesktopWidth, height: DesktopHeight } = desktopRef.current.getBoundingClientRect();
                WindowRef.current.style.top = (DesktopHeight - WindowHeight) / 2 + "px";
                WindowRef.current.style.left = (DesktopWidth - WindowWidth) / 2 + "px";
            }
        }
    }, [WindowRef, desktopRef, startInFullScreen]);

    useEffect(() => {
        if (WindowRef.current !== null) {
            const element = WindowRef.current;
            element.addEventListener('resize', (e) => {
                const WinX = WindowRef.current.offsetLeft;
                const WinY = WindowRef.current.offsetTop;
                const { width, height } = e.detail;
                let { x: DesktopX, y: DesktopY, width: maxX, height: maxY } = desktopRef.current.getBoundingClientRect();
                let { height: WinHeadHeight } = dragHandle.current.getBoundingClientRect();
                maxX -= WinX;
                maxY -= WinY;
                WindowRef.current.style.width = Math.max(Math.min(width, maxX), 200) + "px";
                WindowRef.current.style.height = Math.max(Math.min(height, maxY), WinHeadHeight + 100) + "px";
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

    }, [WindowRef, desktopRef]);

    useEffect(() => {
        if (WindowRef.current !== null) {
            const { width: WindowWidth, height: WindowHeight } = WindowRef.current.getBoundingClientRect();
            let { x: DesktopX, y: DesktopY, width: maxX, height: maxY } = desktopRef.current.getBoundingClientRect();
            if (WindowRef.current.offsetLeft < 0) WindowRef.current.style.left = DesktopX + "px";
            if (WindowRef.current.offsetTop < 0) WindowRef.current.style.top = DesktopY + "px";
            WindowRef.current.style.width = Math.max(Math.min(WindowWidth, maxX),) + "px !important";
            WindowRef.current.style.height = Math.max(Math.min(WindowHeight, maxY),) + "px !important";
        }

    }, [bodyRef, dragHandle, WindowRef, desktopRef]);

    const drag = e => {

        if (draggable === true) {
            e.target.ariaSelected = 'true';

            let InitialMouseX = e.clientX;
            let InitialMouseY = e.clientY;
            const { width: WindowWidth, height: WindowHeight } = WindowRef.current.getBoundingClientRect();
            let { x: DesktopX, y: DesktopY, width: maxX, height: maxY } = desktopRef.current.getBoundingClientRect();
            maxX -= WindowWidth;
            maxY -= WindowHeight;


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
                WindowRef.current.style.left = Math.min(Math.max(WindowRef.current.offsetLeft - DraggedMouseX, 0), maxX) + "px";
                WindowRef.current.style.top = Math.min(Math.max(WindowRef.current.offsetTop - DraggedMouseY, 0), maxY) + "px";
            }

            const up = e => {
                if (e.type === 'touchend') {
                    document.removeEventListener('touchmove', move);
                    document.removeEventListener('touchend', up);
                } else {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', up);
                }
            }

            if (e.type === 'touchstart') {
                document.addEventListener('touchmove', move);
                document.addEventListener('touchend', up);
            } else {
                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', up);
            }
        }
    }

    const ToogleMode = e => {
        if(WindowRef !== null)
        {
            if(Mode === 'normal') {
                const dimensions = WindowRef.current.getBoundingClientRect();
                dimensions.x = WindowRef.current.offsetLeft;
                dimensions.y = WindowRef.current.offsetTop;
                WindowRef.current.style.width = "100%";
                WindowRef.current.style.height = "calc(100% - 80px)";
                WindowRef.current.style.top = "0px";
                WindowRef.current.style.left = "0px";
                setWindowDimensions(dimensions);
                setMode('full');
            } else {
                if(WindowDimensions !== null) {
                    WindowRef.current.style.width = WindowDimensions.width + "px";
                    WindowRef.current.style.height = WindowDimensions.height + "px";
                    WindowRef.current.style.top = WindowDimensions.y + "px";
                    WindowRef.current.style.left = WindowDimensions.x + "px";
                } else {
                    WindowRef.current.style.width = "60%";
                    WindowRef.current.style.height = "70%";
                    const { width: WindowWidth, height: WindowHeight } = WindowRef.current.getBoundingClientRect();
                    let { width: DesktopWidth, height: DesktopHeight } = desktopRef.current.getBoundingClientRect();
                    WindowRef.current.style.top = (DesktopHeight - WindowHeight) / 2 + "px";
                    WindowRef.current.style.left = (DesktopWidth - WindowWidth) / 2 + "px";
                }
                setMode('normal');
            }
        }
    }

    const Focus = e => {
        if (WindowRef.current !== null) {
            WindowRef.current.style.zIndex = maxZIndex + 1;
            setMaxZIndex(maxZIndex + 1);
        }
    }

    return (
        <div className="Window" ref={WindowRef}
            onMouseDown={Focus}
        >
            <div className="WindowlHead"
                onMouseDown={drag}
                onTouchStart={drag}
                onMouseUp={e => e.target.ariaSelected = 'false'}
                onMouseLeave={e => e.target.ariaSelected = 'false'}
                onClick={e => bodyRef.current ? bodyRef.current.click() : null}
                ref={dragHandle}
            >
                {
                    CustomTitleBar !== null ? CustomTitleBar
                        :
                        <div className="WindowTitle">
                            {title}
                        </div>
                }
                {
                    ShowWindowControls === true ? (
                        <div className="WindowControls">
                            <button className="WinControlClose" 
                                disabled={DisableClose} 
                                onClick={e=>{DispatchWindowAction(idx, 'close')}}>
                                <svg width="7" height="7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="#000" strokeWidth="1.2" strokeLinecap="round" d="M1.182 5.99L5.99 1.182m0 4.95L1.182 1.323"></path>
                                </svg>
                            </button>
                            <button className="WinControlMinimize" 
                                disabled={DisableMinimise}
                                onClick={e=>{DispatchWindowAction(idx, 'minimize')}}
                                >
                                <svg width="6" height="1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="#000" strokeWidth="2" strokeLinecap="round" d="M.61.703h5.8"></path>
                                </svg>
                            </button>
                            <button className="WinControlResize" 
                                disabled={DisableReisze}
                                onClick={ToogleMode}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.88 12.88">
                                    <circle cx="6.44" cy="6.44" r="6.44" fill="none"></circle>
                                    <path d="M4.871 3.553L9.37 8.098V3.553H4.871zm3.134 5.769L3.506 4.777v4.545h4.499z"></path>
                                </svg>
                            </button>
                        </div>
                    ) : null
                }
            </div>
            <div className="WindowBody" onMouseDown={e => {
                if (e.target === bodyRef.current)
                    e.target.firstChild?.click()
                WindowRef.current.click()
            }} ref={bodyRef}>
                {children}
            </div>
        </div>
    );
}
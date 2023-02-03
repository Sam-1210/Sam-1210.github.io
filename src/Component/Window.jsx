import { useRef, useContext, useEffect } from "react";
import { DesktopContext } from "../App";
import "../stylesheets/Window.css"

export default function Window({ title = 'Window', children, draggable = true, ShowWindowControls = true, CustomTitleBar = null }) {
    const bodyRef = useRef(null);
    const dragHandle = useRef(null);
    const WindowRef = useRef(null);
    const desktopRef = useContext(DesktopContext);

    useEffect(() => {
        if (WindowRef.current !== null) {
            const element = WindowRef.current;
            element.addEventListener('resize', (e) => {
                const { x: WinX, y: WinY } = WindowRef.current.getBoundingClientRect();
                const { width, height } = e.detail;
                let { x: DesktopX, y: DesktopY, width: maxX, height: maxY } = desktopRef.current.getBoundingClientRect();
                let { height: WinHeadHeight } = dragHandle.current.getBoundingClientRect();
                maxX -= WinX - DesktopX;
                maxY -= WinY - DesktopY;
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
            if (WindowRef.current.offsetLeft < DesktopX) WindowRef.current.style.left = DesktopX + "px";
            if (WindowRef.current.offsetTop < DesktopY) WindowRef.current.style.top = DesktopY + "px";
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

    return (
        <div className="Window" ref={WindowRef}>
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
                            <button className="WinControlClose">
                                <svg width="7" height="7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="#000" strokeWidth="1.2" strokeLinecap="round" d="M1.182 5.99L5.99 1.182m0 4.95L1.182 1.323"></path>
                                </svg>
                            </button>
                            <button className="WinControlResize">
                                <svg width="6" height="1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="#000" strokeWidth="2" strokeLinecap="round" d="M.61.703h5.8"></path>
                                </svg>
                            </button>
                            <button className="WinControlMinimize">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.88 12.88">
                                    <circle cx="6.44" cy="6.44" r="6.44" fill="none"></circle>
                                    <path d="M4.871 3.553L9.37 8.098V3.553H4.871zm3.134 5.769L3.506 4.777v4.545h4.499z"></path>
                                </svg>
                            </button>
                        </div>
                    ) : null
                }
            </div>
            <div className="WindowBody" onClick={e => e.target === bodyRef.current && e.target.firstChild ? e.target.firstChild.click() : null} ref={bodyRef}>
                {children}
            </div>
        </div>
    );
}
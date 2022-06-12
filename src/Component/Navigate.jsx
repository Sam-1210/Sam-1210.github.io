import AboutMe from "./AboutMe"
import Projects from "./Project";
import "../stylesheets/Navigate.css"


function Menu(props) {
    const MenuItems = [
        {command: "about", Name: "👉 About Me"},
        {command: "projects --all", Name: "👉 Projects"},
        {command: "skills", Name: "👉 Skills"},
        {command: "contact", Name: "👉 Contact"}
    ]

    return (
        <div className="Menu">
            <h1>Click on the Menu Option to Navigate to Destination</h1>
            <div className="MenuContainer">
                {
                    MenuItems.map(item=>
                        <div key={item.Name} 
                          className="MenuItem" 
                          onClick={e=>{props.ShowMenu.element.value=`easterRun navigate ${item.command}`; props.ShowMenu.element.click()}}>{item.Name}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default function Navigate(props) {
    const args = [...props.args];
    const token = args.length ? args.shift() : '';
    const help = <div>navigate version 1.0<br />some help, <br />Available parameter are</div>

    let screenElement;
    switch (token) {
        case "menu":
            screenElement = <Menu args={args} ShowMenu={props.CommandReader}/>
            break;
        case "about":
            screenElement = <AboutMe CommandReader={props.CommandReader.element}/>
            break;
        case "projects":
            screenElement = <Projects args={args} />
            break;
        case "skills":
            screenElement = <Menu args={args} />
            break;
        case "contact":
            screenElement = <Menu args={args} />
            break;
        case "":
            screenElement = <div>
                <div>Empty Parameter</div>
                {help}
            </div>
            break;
        default:
            screenElement = <div>
                <div>Invalid Parameter</div>
                {help}
            </div>
            break;
    };

    return (<div>{screenElement}</div>);
}
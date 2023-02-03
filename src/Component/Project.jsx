import "../stylesheets/Project.css"
import dynamicImport from "../tools/dynamicImport";
import ProjectSourceIco from "../images/source.png"
import ProjectDemoIco from "../images/live.png"
import ProjectData from "../data/projects.json"

export default function Projects(props) {
    const args = [...props.args];
    const token = args.length ? args.shift() : '';

    let filter;

    switch (token) {
        case "--all":
            filter = 'Display All!';
            break;
        case "":
            filter = "Display None";
            break;
        case "-f":
            filter = "Fuck! !";
            break;
        default:
            filter = "Ahhhh another issue!!";
            break;
    }

    let ProjectThumbs = dynamicImport(require.context("../data/project_thumbs/", false, /\.(png|jpe?g|svg)$/))

    let ProjectElements = ProjectData.map((element, index) => {
        return (
            <div key={element.Name} className="ProjectContainer">
                <div className="ProjectDetails">
                    <div className="ProjectHeading ProjectName">{element.Name}</div>
                    <div className="ProjectDescription">{element.Description}</div>
                    {
                        element.LinkLive ? <div className="ProjectLinkContainer">
                            <img className="ProjectLinkIcon" src={ProjectDemoIco} alt="View Project" />
                            <a className="ProjectLink" href={element.LinkLive}>{"//"}View Live Project/Demo</a>
                        </div> : null
                    }
                    {
                        element.LinkSource ? <div className="ProjectLinkContainer">
                            <img className="ProjectLinkIcon" src={ProjectSourceIco} alt="View Project" />
                            <a className="ProjectLink" href={element.LinkSource}>{"//"}Browse Source Code</a>
                        </div> : null
                    }
                    <div className="ProjectHeading Tags">Tags</div>
                    <div className="TechStackList">
                        {
                            element.Tags.map(tag => <div key={tag} className="TechStackItem">{"{"}{tag}{"}"}</div>)
                        }
                    </div>
                </div>
                <div className="ProjectImage">
                    <img src={ProjectThumbs[element.Image]} alt="omcms" />
                </div>
            </div>
        );
    })

    return (
        <div className="ProjectList">
            <h1>All Projects</h1>
            {ProjectElements}
        </div>
    );
}
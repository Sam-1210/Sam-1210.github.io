import "../stylesheets/AboutMe.css"
import MyDP from '../images/profilePhoto.jpg'
import LinkedinIco from "../images/linkedin.png"
import GithubIco from "../images/github.png"
import EmailIco from "../images/email.png"
import Typewriter from 'typewriter-effect';

export default function AboutMe(props)
{
    const setCode = e => {
        props.CommandReader.value = e.target.innerHTML;
        e.stopPropagation();
    };
    return (
        <div>
            <div className="AboutSatyamContainer">
                <div className="AboutSatyam">
                    <h2><Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString('Hi,')
                                .start();
                        }}
                    /></h2>
                    <h1>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.pauseFor(2000)
                                    .typeString('I am Satyam Mishra')
                                    .start()
                                    .pauseFor(4000)
                                    .stop();
                            }}
                        />
                    </h1>
                    <h3>Software Developer</h3>
                    <h4 className="type" >A Computer Science Student, based in Delhi, India. Exploring the field of Software Development and Looking towards Exploring the Industry.</h4>
                    <div className="ContactLinksContainer">
                        <a className="ContactsLink" href="https://www.linkedin.com/in/satyammishra1210/" target="_blank" rel="noreferrer">
                            <img src={LinkedinIco} alt="Linkedin"/>
                        </a>
                        <a className="ContactsLink" href="https://www.github.com/sam-1210" target="_blank" rel="noreferrer">
                            <img src={GithubIco} alt="Github"/>
                        </a>
                        <a className="ContactsLink" href="mailto:dev.sam1210@gmail.com" target="_blank" rel="noreferrer">
                            <img src={EmailIco} alt="Email"/>
                        </a>
                    </div>
                    
                    <div className="GetStarted">To Get Help With Navigation, Type 
                        <code onClick={setCode}>man navigate</code>to get help for navigation or type  
                        <code onClick={setCode}>navigate menu</code>to navigate using GUI
                    </div>
                </div>
                <div className="SatyamDP">
                    <img src={MyDP} alt="Satyam Mishra" />
                </div>
            </div>
        </div>
    );
}
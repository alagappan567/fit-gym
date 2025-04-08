import React from "react";
import Navbar from "./navbar";
import "./about.css";
import { LuMail } from "react-icons/lu";
import { FaGithub, FaInstagram } from "react-icons/fa";

// Import images
import alagappan from "../assets/alagappan.jpg";
import pratheep from "../assets/pratheep.jpg";
import vigneshwari from "../assets/vigneshwari.jpg";


// Import team data
import teamData from "../data/teamData.json";

const About = () => {
  // Map image names to imported images
  const imageMap = {
    "alagappan.jpg": alagappan,
    "pratheep.jpg": pratheep,
    "vigneshwari.jpg": vigneshwari
    
  };

  // Map icon types to imported icons
  const renderIcon = (iconType) => {
    switch(iconType) {
      case "mail":
        return <LuMail />;
      case "github":
        return <FaGithub />;
      case "instagram":
        return <FaInstagram />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1 className="team-heading">Meet our team</h1>
          
          {teamData.map(member => (
            <div className="team" key={member.id}>
              <div className="our-team">
                <div className="pic">
                  <img src={imageMap[member.image]} alt={member.name} />
                </div>
                <h3 className="title">{member.name}</h3>
                <span className="post">{member.role}</span>
                <ul className="social">
                  {member.contacts.map((contact, index) => (
                    <li key={index}>
                      <a 
                        href={contact.link} 
                        className={contact.type} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {renderIcon(contact.icon)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default About;
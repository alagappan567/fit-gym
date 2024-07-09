import Navbar from "./navbar";
import Kaviya from "../assets/kaviya.jpg";
import Vamsi from "../assets/vamsi.jpg";
import Antony from "../assets/antony.jpg";
import Yuvashree from "../assets/yuvashree.jpg"
import "./about.css"
import { LuMail } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <div>
      <Navbar />
      <div class="container">
        <div class="row">
          <h1 className="team-heading">Meet our team</h1>
          <div class="team">
            <div class="our-team">
              <div class="pic">
                <img src={Vamsi} alt="profile"></img>
              </div>
              <h3 class="title">Katta Vamsi Krishna</h3>
              <span class="post">Web Developer</span>
              <ul class="social">
                <li>
                  <a href="mailto:kattavamsikrishna2002@gmail.com" class="mail" target="_blank" rel="noopener noreferrer">
                    <LuMail />
                  </a>
                </li>
                <li>
                  <a href="https://www.github.com/Vamsi971V/" class="github" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/vamsikatta10/" class="instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="team">
            <div class="our-team">
              <div class="pic">
                <img src={Kaviya} alt="profile"></img>
              </div>
              <h3 class="title">Kaviya Bharathi D</h3>
              <span class="post">Web Developer</span>
              <ul class="social">
                <li>
                  <a href="mailto:kaviyabharathi79@gmail.com" class="mail" target="_blank" rel="noopener noreferrer">
                    <LuMail />
                  </a>
                </li>
                <li>
                  <a href="https://www.github.com/kaviyabharathi79/" class="github" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/kaviyabharathii/" class="instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="team">
            <div class="our-team">
              <div class="pic">
                <img src={Yuvashree} alt="profile"></img>
              </div>
              <h3 class="title">Yuvashree D</h3>
              <span class="post">Web Developer</span>
              <ul class="social">
                <li>
                  <a href="mailto:yuvashreed3@gmail.com" class="mail" target="_blank" rel="noopener noreferrer">
                    <LuMail />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Yuvashree-2003" class="github" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </li>           
              </ul>
            </div>
          </div>

          <div class="team">
            <div class="our-team">
              <div class="pic">
                <img src={Antony} alt="profile"></img>
              </div>
              <h3 class="title">Antony Ricky Pong D</h3>
              <span class="post">Web Developer</span>
              <ul class="social">
                <li>
                  <a href="mailto:antonyrickypong@gmail.com" class="mail" target="_blank" rel="noopener noreferrer">
                    <LuMail />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Antony-16" class="github" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/kaviyabharathii/" class="instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
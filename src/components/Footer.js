import React from "react";
import "../css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer-container">
      <p>
        © 2024 Vincent Szmulikowski. Tous droits réservés. Interdiction de
        copie.
      </p>
      <div className="social-icons">
        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a
          href="https://www.linkedin.com/in/your-linkedin-username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

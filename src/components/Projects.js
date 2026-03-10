import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "./ExternalLinks";
import { useLanguage } from "../i18n/LanguageContext";

const spotlightMeta = {
  "No Man's Land": {
    techStack: "C# (UNITY)",
    link: "https://github.com/slakh96/no-mans-land",
    open: "https://gazijarin.itch.io/no-mans-land",
    image: "/assets/nomansland.png",
  },
  "Tall Tales": {
    techStack: "NODE.JS (SOCKET.IO), REACT.JS, MONGODB",
    link: "https://github.com/gazijarin/TallTales",
    open: "https://talltales.herokuapp.com/",
    image: "/assets/talltales.png",
  },
  Portfolio: {
    techStack: "NODE.JS (EXPRESS.JS)",
    link: "https://github.com/gazijarin/Portfolio.js",
    open: "https://afternoon-ocean-92382.herokuapp.com/",
    image: "/assets/portfolio.png",
  },
};

const cardsMeta = {
  "TDSB Homework Management Interface": {
    techStack: "Python (Flask), Vue.js, Bootstrap, SQL",
    link: "https://github.com/gazijarin/TDSBHomeworkManagement",
    open: "https://tdsb-app.herokuapp.com/",
  },
  "Adam A.I.": {
    techStack: "Javascript, HTML / CSS",
    link: "https://github.com/gazijarin/adamai",
    open: "https://gazijarin.github.io/AdamAI/",
  },
  "Distributed Logging and Monitoring System": {
    techStack: "Node.js (Express.js), React.js, PostgreSQL",
    link: "https://github.com/gazijarin/Distributed-Logging-and-Monitoring-System",
  },
  "Odin Bot": {
    techStack: "Javascript, Node.js, Natural NLP, Telegram API",
    link: "https://github.com/gazijarin/OdinBot",
    open: "",
  },
  "Game Centre": {
    techStack: "Java, Android Studio",
    link: "https://github.com/gazijarin/gamecentre",
    open: "",
  },
  "Minimax Stonehenge": {
    techStack: "Python",
    link: "https://github.com/gazijarin/stonehenge",
    open: "",
  },
};

const Projects = () => {
  const { t } = useLanguage();

  const spotlightTranslations = t("projects.spotlight");
  const cardsTranslations = t("projects.cards");

  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">{t("projects.title")}</span>
      </div>
      <Carousel>
        {Object.keys(spotlightMeta).map((key, i) => (
          <Carousel.Item key={key}>
            <img
              className="d-block w-100"
              src={spotlightMeta[key].image}
              alt={key}
            />
            <div className="caption-bg">
              <Carousel.Caption>
                <h3>{spotlightTranslations[key]?.title ?? key}</h3>
                <p>
                  {spotlightTranslations[key]?.desc}
                  <p className="techStack">
                    {spotlightMeta[key].techStack}
                  </p>
                </p>
                <ExternalLinks
                  githubLink={spotlightMeta[key].link}
                  openLink={spotlightMeta[key].open}
                ></ExternalLinks>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="project-container">
        <ul className="projects-grid">
          {Object.keys(cardsMeta).map((key, i) => (
            <FadeInSection delay={`${i + 1}00ms`} key={key}>
              <li className="projects-card">
                <div className="card-header">
                  <div className="folder-icon">
                    <FolderOpenRoundedIcon
                      style={{ fontSize: 35 }}
                    ></FolderOpenRoundedIcon>
                  </div>
                  <ExternalLinks
                    githubLink={cardsMeta[key].link}
                    openLink={cardsMeta[key].open}
                  ></ExternalLinks>
                </div>

                <div className="card-title">{cardsTranslations[key]?.title ?? key}</div>
                <div className="card-desc">{cardsTranslations[key]?.desc}</div>
                <div className="card-tech">{cardsMeta[key].techStack}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;

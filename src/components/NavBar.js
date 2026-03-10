import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SHOW_PROJECTS } from "../config";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/NavBar.css";
import LanguageSwitcher from "./LanguageSwitcher";

const NavBarComponent = () => {
  const { t } = useLanguage();

  return (
    <Navbar fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Luiz Nunes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#intro">{t("nav.home")}</Nav.Link>
            <Nav.Link href="#about">{t("nav.about")}</Nav.Link>
            <Nav.Link href="#experience">{t("nav.experience")}</Nav.Link>
            {SHOW_PROJECTS && (
              <Nav.Link href="#projects">{t("nav.projects")}</Nav.Link>
            )}
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="mailto:leavemehere00dat@gmail.com">
              <EmailRoundedIcon style={{ fontSize: 20 }}></EmailRoundedIcon>
            </Nav.Link>
            <Nav.Link href="https://github.com/luizsn00" target="_blank">
              <GitHubIcon style={{ fontSize: 19 }}></GitHubIcon>
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/luiz-nunes-6a8b091a3/"
              target="_blank"
            >
              <LinkedInIcon style={{ fontSize: 21 }}></LinkedInIcon>
            </Nav.Link>
          </Nav>
          <LanguageSwitcher />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;

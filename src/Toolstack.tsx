import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SiPostman, SiMacos } from "react-icons/si";
import { VscVscodeInsiders } from "react-icons/vsc";
import { SiObsidian } from "react-icons/si";
import { FaGithub } from "react-icons/fa";



const Toolstack: React.FC = () => {
  return (
    <Container fluid className="about-section">
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <SiMacos />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
        {/* <SiVisualstudiocode /> */}
        <VscVscodeInsiders />
      </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiPostman />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiObsidian />
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <FaGithub />
        </Col>
      </Row>
    </Container>
  );
};

export default Toolstack;

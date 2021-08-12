import React from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeContainer>
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1>Welcome to My Notes</h1>
              <p>One safe place for all your notes.</p>
            </div>
          </div>
        </Row>
      </Container>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  min-height: 90vh;
  align-items: center;
  background: url("./images/background.jpg");
  background-position: center;
  background-size: cover;

  & .intro-text {
    width: 100%;
    text-align: center;
    color: #000;

    h1 {
      font-size: 3.5rem;
    }

    p {
      font-size: 1.5rem;
    }

    @media only screen and (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
`;

export default Home;

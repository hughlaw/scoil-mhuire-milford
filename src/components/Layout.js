/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Container, Row, Col } from 'react-bootstrap';

import NavBar from './NavBar';
import { FiChevronsDown } from 'react-icons/fi';
import Crest from '../images/crest.svg';
import styled, { keyframes } from 'styled-components';
import Footer from './Footer';

const Splash = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: url(${props => props.image});
  background-color: #444;
  background-blend-mode: multiply;
  background-size: cover;
`;

const StyledCrest = styled.img`
  width: 50vw;
  max-width: 600px;
`;

const bounce = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(10px);
  }
`;

const StyledIcon = styled(FiChevronsDown)`
  color: white;
  font-size: 5rem;
  animation: 1s ease-in-out infinite alternate ${bounce};
`;

const Layout = ({ children, pageInfo, headerImage }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Container fluid className="px-0 main">
          <NavBar pageInfo={pageInfo} />
          {headerImage && (
            <Splash id="splash" image={headerImage.src}>
              <StyledCrest src={Crest} />
              <StyledIcon onClick={() => window.scrollTo(0, 500)} />
            </Splash>
          )}
          <Container>
            <Row id="main-content" noGutters>
              <Col>
                <main className="mt-5">{children}</main>
              </Col>
            </Row>
          </Container>
        </Container>
        <Footer />
      </>
    )}
  />
);

export default Layout;

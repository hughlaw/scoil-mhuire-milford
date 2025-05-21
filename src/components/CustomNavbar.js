import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import crest from '../images/crest-small.svg';

import { Navbar, Nav, Container } from 'react-bootstrap';

const SiteTitle = styled(Link)`
  color: white;
  font-size: 1rem;
  padding: 0;
  &:hover {
    color: white;
  }
`;

const CustomNavbar = ({ pageInfo }) => {
  const { sanitySiteSettings: settings } = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        navigation {
          ... on SanityPoliciesPage {
            title
            slug {
              current
            }
          }
          ... on SanityPage {
            title
            slug {
              current
            }
          }
          ... on SanityAboutPage {
            title
            slug {
              current
            }
          }
        }
      }
    }
  `);

  return (
    <Navbar variant="dark" expand="lg" id="site-navbar">
      <Container>
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">
            <img src={crest} alt="" width="58" height="66" />
          </Navbar.Brand>
        </Link>
        <SiteTitle to="/">Scoil Mhuire Milford</SiteTitle>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" activeKey={pageInfo && pageInfo.pageName}>
            <Link
              to="/news"
              activeClassName="active"
              className="link-no-style pl-lg-4 pb-3 pb-lg-0"
            >
              News
            </Link>
            {/* <Link
              to="/events"
              activeClassName="active"
              partiallyActive={true}
              className="link-no-style pl-lg-4 pb-3 pb-lg-0"
            >
              Events
            </Link> */}
            {/* <Link
              to="/classes"
              activeClassName="active"
              partiallyActive={true}
              className="link-no-style pl-lg-4 pb-3 pb-lg-0"
            >
              Classes
            </Link> */}
            {settings.navigation.map(page => (
              <Link
                key={page.slug.current}
                to={`/${page.slug.current}`}
                activeClassName="active"
                className="link-no-style pl-lg-4 pb-3 pb-lg-0"
              >
                {page.title}
              </Link>
            ))}
            <Link
              to="/policies"
              activeClassName="active"
              partiallyActive={true}
              className="link-no-style pl-lg-4 pb-3 pb-lg-0"
            >
              Policies
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

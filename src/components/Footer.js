import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';

const Footer = () => {
  const { sanitySiteSettings: settings } = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        address
        tel1
        tel1raw
        tel2
        tel2raw
        contactEmail
        footerLinks {
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
    <Container fluid className="px-0">
      <Row as="footer" noGutters>
        <Container>
          <Row className="py-4">
            <Col xs={12} sm={6}>
              <h4 className="mb-3">Contact details</h4>
              <dl>
                <div className="d-flex">
                  <dt className="pr-2">
                    <FiMapPin />
                  </dt>
                  <dd>
                    <address>{settings.address}</address>
                  </dd>
                </div>
                <div className="d-flex">
                  <dt className="pr-2">
                    <FiPhone />
                  </dt>
                  <dd>
                    <a href={`tel://${settings.tel1raw}`}>{settings.tel1}</a>
                    <br />
                    <a href={`tel://${settings.tel2raw}`}>{settings.tel2}</a>
                  </dd>
                </div>
                <div className="d-flex">
                  <dt className="pr-2">
                    <FiMail />
                  </dt>
                  <dd>
                    <a href={`mailto:${settings.contactEmail}`}>
                      {settings.contactEmail}
                    </a>
                  </dd>
                </div>
              </dl>
            </Col>
            <Col xs={12} sm={6} className="text-sm-right">
              <h4 className="mb-3">Useful links</h4>
              {settings.footerLinks.map(page => (
                <Link
                  key={page.slug.current}
                  to={`/${page.slug.current}`}
                  activeClassName="active"
                  className="d-block pb-1"
                >
                  {page.title}
                </Link>
              ))}
              <a
                href="https://www.aladdin.ie/signin"
                target="_blank"
                rel="noreferrer"
              >
                Aladdin Login
              </a>
            </Col>
          </Row>
          <Row>
            <Col className="text-center py-2">
              © {new Date().getFullYear()} Scoil Mhuire Milford
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Footer;

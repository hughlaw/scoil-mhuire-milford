import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
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
        twitter
        facebook
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
              <dl className="mb-2">
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
                <div className="mb-4 mb-sm-0">
                  {settings.facebook && (
                    <div className="d-flex align-items-center mb-2">
                      <dt className="pr-2">
                        <FaFacebook />
                      </dt>
                      <dd className="m-0 mt-1">
                        <a
                          href={`http://www.facebook.com/${settings.facebook}`}
                          className="mr-3"
                          target="_blank"
                          rel="noreferrer"
                          aria-label=""
                        >
                          Scoil Mhuire on Facebook
                        </a>
                      </dd>
                    </div>
                  )}
                  {settings.twitter && (
                    <div className="d-flex align-items-center mb-2">
                      <dt className="pr-2">
                        <FaTwitter />
                      </dt>
                      <dd className="m-0 mt-1">
                        <a
                          href={`http://www.twitter.com/${settings.twitter}`}
                          className="mr-3"
                          target="_blank"
                          rel="noreferrer"
                          aria-label=""
                        >
                          Scoil Mhuire on Twitter
                        </a>
                      </dd>
                    </div>
                  )}
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
                className="d-block pb-1"
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

import React from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import { FiChevronRight } from 'react-icons/fi';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import NewsArticlePreview from '../components/NewsArticlePreview';
import EventPreview from '../components/EventPreview';
import { graphql, useStaticQuery } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { Link } from 'gatsby';
import { serializers } from '../blockContent';

const IndexPage = () => {
  const {
    sanityHomepageContent: homepageContent,
    allSanityNewsArticle: newsArticles,
    allSanityEvent: events,
  } = useStaticQuery(graphql`
    {
      sanityHomepageContent {
        splashImage {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
        _rawPrincipalsWelcome
        _rawAlert
        _rawSchoolMotto
      }

      allSanityNewsArticle(limit: 3, sort: { order: DESC, fields: date }) {
        edges {
          node {
            id
            title
            excerpt
            slug {
              current
            }
            image {
              image {
                asset {
                  fluid(maxHeight: 500) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
            }
            date
          }
        }
      }

      allSanityEvent(limit: 3, sort: { order: DESC, fields: startDate }) {
        edges {
          node {
            id
            title
            excerpt
            slug {
              current
            }
            image {
              image {
                asset {
                  fluid(maxHeight: 500) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
            }
            startDate
            endDate
            showTimes
          }
        }
      }
    }
  `);

  const hasEvents = events.edges.length > 0;

  return (
    <Layout
      pageInfo={{ pageName: 'index' }}
      headerImage={homepageContent.splashImage.asset.fluid}
    >
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <Container>
        {homepageContent._rawAlert.showAlert && (
          <Row className="my-4">
            <Col>
              <Alert variant="warning">
                <h2>{homepageContent._rawAlert.alertTitle}</h2>
                <BlockContent blocks={homepageContent._rawAlert.alertText} />
              </Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            <h2>Principal's welcome</h2>
            <BlockContent
              blocks={homepageContent._rawPrincipalsWelcome}
              serializers={serializers}
            />
          </Col>
        </Row>
        {homepageContent._rawSchoolMotto && (
          <Row>
            <Col>
              <h2>Our school motto</h2>
              <BlockContent
                blocks={homepageContent._rawSchoolMotto}
                serializers={serializers}
              />
            </Col>
          </Row>
        )}

        <Row className="mt-4 mb-4">
          <Col>
            <h2>News & Announcements</h2>
            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
              {newsArticles.edges.map(({ node: article }, i) => {
                return (
                  <Col className="mb-4" key={article.slug.current}>
                    <NewsArticlePreview
                      title={article.title}
                      excerpt={article.excerpt}
                      date={article.date}
                      image={article.image?.image}
                      slug={article.slug.current}
                    />
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Link to="news" className="ml-auto">
                See more announcements <FiChevronRight />
              </Link>
            </Row>
          </Col>
        </Row>

        {hasEvents && (
          <Row className="mt-4 mb-4">
            <Col>
              <h2>Upcoming events</h2>
              <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
                {events.edges.map(({ node: event }, i) => {
                  return (
                    <Col className="mb-4" key={event.slug.current}>
                      <EventPreview
                        title={event.title}
                        excerpt={event.excerpt}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        showTimes={event.showTimes}
                        image={event.image?.image}
                        slug={event.slug.current}
                      />
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Link to="events" className="ml-auto">
                  See all events <FiChevronRight />
                </Link>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;

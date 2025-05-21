import React from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import { FiChevronRight } from 'react-icons/fi';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import NewsArticlePreview from '../components/NewsArticlePreview';
import { graphql, useStaticQuery } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { Link } from 'gatsby';
import { serializers } from '../blockContent';

const IndexPage = () => {
  const {
    sanityHomepageContent: homepageContent,
    allSanityNewsArticle: newsArticles,
  } = useStaticQuery(graphql`
    query HomePageQuery {
      sanityHomepageContent {
        splashImage {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
        _rawPrincipalsWelcome
        _rawAlert(resolveReferences: { maxDepth: 10 })
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
            _rawImage
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
    }
  `);

  // Filter the news articles client-side
  const recentArticles = newsArticles.edges.filter(({ node }) => {
    const articleDate = new Date(node.date);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 3);
    return articleDate >= oneMonthAgo;
  });

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
                <BlockContent
                  blocks={homepageContent._rawAlert.alertText}
                  serializers={serializers}
                />
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

        {recentArticles.length > 0 && (
          <Row className="mt-4 mb-4">
            <Col>
              <h2>News & Announcements</h2>
              <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
                {recentArticles.map(({ node: article }, i) => {
                  return (
                    <Col className="mb-4" key={article.slug.current}>
                      <NewsArticlePreview
                        title={article.title}
                        excerpt={article.excerpt}
                        date={article.date}
                        image={article._rawImage}
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
        )}

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
      </Container>
    </Layout>
  );
};

export default IndexPage;

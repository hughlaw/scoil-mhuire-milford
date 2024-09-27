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
  const { sanityHomepageContent: homepageContent } = useStaticQuery(graphql`
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
        _rawAlert(resolveReferences: { maxDepth: 10 })
        _rawSchoolMotto
      }
    }
  `);

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

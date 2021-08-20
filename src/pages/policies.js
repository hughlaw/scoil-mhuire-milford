import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '../blockContent';

const PoliciesPage = () => {
  const { allSanityPoliciesPage: policyPages } = useStaticQuery(graphql`
    {
      allSanityPoliciesPage {
        edges {
          node {
            title
            _rawIntroduction
            slug {
              current
            }
          }
        }
      }
    }
  `);

  return (
    <Layout pageInfo={{ pageName: 'classes' }}>
      <SEO title="Classes" />
      <Container>
        <Row>
          <Col>
            <h1>Policies</h1>
          </Col>
        </Row>

        {policyPages.edges.map((policyPage, i) => (
          <Row>
            <Col className="mb-4" key={i}>
              <Link to={`/policies/${policyPage.node.slug.current}`}>
                <h2 className="h3">{policyPage.node.title}</h2>
              </Link>
              <BlockContent
                blocks={policyPage.node._rawIntroduction}
                serializers={serializers}
              />
              <Link to={`/policies/${policyPage.node.slug.current}`}>
                <p className="h6">Read more<span class="sr-only"> on {policyPage.node.title}</span></p>
              </Link>
            </Col>
          </Row>
        ))}
      </Container>
    </Layout>
  );
};

export default PoliciesPage;

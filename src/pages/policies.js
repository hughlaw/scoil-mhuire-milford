import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { graphql, useStaticQuery } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { FiDownload } from 'react-icons/fi';
import { serializers } from '../blockContent';
import styled from 'styled-components';

const Hr = styled.hr`
  width: 100%;
`;

const PoliciesPage = () => {
  const { sanityPoliciesPage: policyPage } = useStaticQuery(graphql`
    {
      sanityPoliciesPage {
        _rawIntroduction
        policies {
          name
          description
          policyDocument {
            asset {
              originalFilename
              url
              size
              title
              description
            }
          }
        }
      }
    }
  `);

  return (
    <Layout pageInfo={{ pageName: 'policies' }}>
      <SEO title="Policies" />
      <Container>
        <Row>
          <Col>
            <h1>Policies</h1>
            <BlockContent
              blocks={policyPage._rawIntroduction}
              serializers={serializers}
            />
          </Col>
        </Row>

        <Row className="mt-4 mb-4">
          <Col>
            {policyPage.policies.map((policy, i, arr) => (
              <Row className="mb-4" key={`policy-${i}`}>
                <Col className="d-sm-flex justify-content-between align-items-center mb-3">
                  <h2 className="mb-0">{policy.name}</h2>
                  {policy.policyDocument && (
                    <a
                      className="btn btn-secondary"
                      href={`${policy.policyDocument.asset.url}?dl=`}
                    >
                      <FiDownload /> Download
                      <span className="sr-only"> {policy.name} document</span> (
                      {Math.ceil(policy.policyDocument.asset.size / 1024)}kB)
                    </a>
                  )}
                </Col>
                <Col xs={12}>
                  <p>{policy.description}</p>
                </Col>
                {arr.length !== i + 1 && <Hr />}
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PoliciesPage;

import React, { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { graphql, useStaticQuery } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { FiDownload, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { serializers } from '../blockContent';
import styled from 'styled-components';

const Hr = styled.hr`
  width: 100%;
`;

const Policy = ({i, policy, policies, last}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Row className="mb-3" key={`policy-${i}`}>
      <Col className="d-sm-flex justify-content-between align-items-center mb-3">
        {policy.description ? (
          <Button variant="link" className="p-0" onClick={() => setExpanded(!expanded)}>
            <h3 className="h4 mb-0">{policy.name} {expanded ? <FiChevronUp /> : <FiChevronDown />}</h3>
          </Button>
        ) : (
          <h3 className="h4 mb-0">{policy.name}</h3>
        )}
        {policy.policyDocument && (
          <a
            className="btn btn-secondary"
            href={`${policies.find(p => p._key === policy._key)?.policyDocument.asset?.url}?dl=`}
          >
            <FiDownload /> Download
            <span className="sr-only"> {policy.name} document</span> (
            {Math.ceil(policies.find(p => p._key === policy._key)?.policyDocument.asset?.size / 1024)}kB)
          </a>
        )}
      </Col>
      {expanded && (
        <Col xs={12}>
          <BlockContent
            className="mb-4"
            blocks={policy.description}
            serializers={serializers}
          />
      </Col>
      )}
      {!last && <Hr />}
    </Row>
  )
}

const PoliciesPage = () => {
  const { sanityPoliciesPage: policyPage } = useStaticQuery(graphql`
    {
      sanityPoliciesPage {
        policySection {
          title
          _rawIntroduction
          _rawPolicies
          policies {
            _key
            name
            policyDocument {
              asset {
                originalFilename
                url
                size
              }
            }
          }
        }
        _rawIntroduction
      }
    }
  `)

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
            {policyPage.policySection.map((policySection, i, arr) => (
              <Row className="mb-4" key={`policy-section-${i}`} >
                <Col>
                  <h2 className="mb-2">{policySection.title}</h2>
                  <BlockContent
                    className="mb-4"
                    blocks={policySection._rawIntroduction}
                    serializers={serializers}
                  />
                  {policySection._rawPolicies.map((policy, i, arr) => (
                    <Policy i={i} policy={policy} policies={policySection.policies} last={arr.length === i+1}/>
                    // <Row className="mb-3" key={`policy-${i}`}>
                    //   <Col className="d-sm-flex justify-content-between align-items-center mb-3">
                    //     <Button variant="link" className="p-0">
                    //       <h3 className="h4 mb-0">{policy.name}</h3>
                    //     </Button>
                    //     {policy.policyDocument && (
                    //       <a
                    //         className="btn btn-secondary"
                    //         href={`${policySection.policies.find(p => p._key === policy._key)?.policyDocument.asset?.url}?dl=`}
                    //       >
                    //         <FiDownload /> Download
                    //         <span className="sr-only"> {policy.name} document</span> (
                    //         {Math.ceil(policySection.policies.find(p => p._key === policy._key)?.policyDocument.asset?.size / 1024)}kB)
                    //       </a>
                    //     )}
                    //   </Col>
                    //   <Col xs={12}>
                    //   <BlockContent
                    //     className="mb-4"
                    //     blocks={policy.description}
                    //     serializers={serializers}
                    //   />
                    //   </Col>
                    //   {arr.length !== i + 1 && <Hr />}
                    // </Row>
                  ))}
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PoliciesPage;

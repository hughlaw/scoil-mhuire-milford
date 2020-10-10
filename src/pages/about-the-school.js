import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { graphql, useStaticQuery } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';
import { serializers } from '../blockContent';

const builder = imageUrlBuilder({
  projectId: 'i3ln9d71',
  dataset: 'production',
});

const urlFor = source => {
  return builder.image(source);
};

const AboutTheSchoolPage = () => {
  const {
    sanityAboutPage: aboutPage,
    sanityStaffDirectory: staff,
  } = useStaticQuery(graphql`
    {
      sanityAboutPage {
        staffIntro
        _rawPagecontent
      }
      sanityStaffDirectory {
        staffMembers {
          id
          name
          jobTitle
          _rawProfilePic
        }
      }
    }
  `);

  return (
    <Layout pageInfo={{ pageName: 'about-the-school' }}>
      <SEO title="About Scoil Mhuire Milford" />
      <Container>
        <Row>
          <Col>
            <h1>About the school</h1>

            <h2>Our staff</h2>
            <p>{aboutPage.staffIntro}</p>
            <Row>
              {staff.staffMembers.map(person => (
                <Col md={6} xl="4" key={person.id}>
                  <Row className="mb-4">
                    <Col xs="auto" className="flex-shrink-1">
                      <img
                        alt={`${person.name}`}
                        className="profile-pic"
                        src={urlFor(person._rawProfilePic)
                          .width(100)
                          .height(100)
                          .url()}
                      />
                    </Col>
                    <Col className="w-100 mt-2 d-flex flex-column justify-content-center">
                      <h5 className="mb-1">{person.name}</h5>
                      <p className="text-muted">{person.jobTitle}</p>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>

            <BlockContent
              blocks={aboutPage._rawPagecontent}
              serializers={serializers}
            />
          </Col>
        </Row>

        <Row className="mt-4 mb-4">
          <Col></Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AboutTheSchoolPage;

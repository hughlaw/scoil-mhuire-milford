import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';

import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder({
  projectId: 'i3ln9d71',
  dataset: 'production',
});

const urlFor = source => {
  return builder.image(source);
};

const ClassesPage = () => {
  const { allSanityClassPage: classPages } = useStaticQuery(graphql`
    {
      allSanityClassPage(sort: { order: ASC, fields: sortOrder }) {
        edges {
          node {
            title
            slug {
              current
            }
            teacher {
              name
              _rawProfilePic
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
            <h1>Class pages</h1>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3}>
          {classPages.edges.map((classPage, i) => (
            <Col className="mb-4" key={i}>
              <Card>
                <Card.Body className="d-flex justify-content-center">
                  <Link
                    to={`/classes/${classPage.node.slug.current}`}
                    className="d-flex flex-column align-items-center justify-content-between"
                  >
                    <img
                      alt={`${classPage.node.teacher.name}`}
                      className="profile-pic"
                      src={urlFor(classPage.node.teacher._rawProfilePic)
                        .width(150)
                        .height(150)
                        .url()}
                    />
                    <h2 className="mb-0">{classPage.node.title}</h2>
                    <p className="text-muted">{classPage.node.teacher.name}</p>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default ClassesPage;

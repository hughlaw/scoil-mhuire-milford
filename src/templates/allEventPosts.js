import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Row, Col } from 'react-bootstrap';
import EventPreview from '../components/EventPreview';
import { Link } from 'gatsby';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function allPosts({ pageContext, data }) {
  const { currentPage, numPagesEvents } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPagesEvents;
  const prevPage =
    currentPage - 1 === 1 ? `/events` : `/events/${currentPage - 1}`;
  const nextPage = `/events/${currentPage + 1}`;
  const posts = data.allSanityEvent.edges;
  const hasEvents = posts.length > 0;

  return (
    <Layout>
      <SEO
        title="News and Announcements"
        keywords={[`gatsby`, `react`, `bootstrap`]}
      />
      <h1>Upcoming events</h1>

      {hasEvents ? (
        <>
          <p>Here's some important dates for your calendar.</p>
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
            {posts.map(post => (
              <Col className="mb-4" key={post.node.slug.current}>
                <EventPreview
                  image={post.node.image.image}
                  title={post.node.title}
                  excerpt={post.node.excerpt}
                  startDate={post.node.startDate}
                  endDate={post.node.enddate}
                  showTimes={post.node.showTimes}
                  slug={post.node.slug.current}
                />
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              {!isFirst && (
                <Link
                  to={prevPage}
                  className="mb-4 d-flex justify-content-start align-items-center"
                >
                  <FiChevronLeft />
                  Newer
                </Link>
              )}
            </Col>
            <Col className="text-right">
              {!isLast && (
                <Link
                  to={nextPage}
                  className="mb-4 d-flex justify-content-end align-items-center"
                >
                  Older
                  <FiChevronRight />
                </Link>
              )}
            </Col>
          </Row>
        </>
      ) : (
        'There are currently no events'
      )}
    </Layout>
  );
}

export const pageQuery = graphql`
  query AllEventsQuery($skip: Int!, $limit: Int!) {
    allSanityEvent(
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: endDate }
    ) {
      edges {
        node {
          slug {
            current
          }
          title
          excerpt
          startDate
          endDate
          showTimes
          image {
            image {
              asset {
                fluid(maxHeight: 500) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

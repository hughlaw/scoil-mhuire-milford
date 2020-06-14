import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Row, Col } from 'react-bootstrap';
import NewsArticlePreview from '../components/NewsArticlePreview';
import { Link } from 'gatsby';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function allPosts({ pageContext, data }) {
  const { currentPage, numPagesArticles } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPagesArticles;
  const prevPage = currentPage - 1 === 1 ? `/news` : `/news/${currentPage - 1}`;
  const nextPage = `/news/${currentPage + 1}`;
  const posts = data.allSanityNewsArticle.edges;

  console.log('isLast', isLast);
  console.log('currentPage', currentPage);
  console.log('numPagesArticles', numPagesArticles);

  return (
    <Layout>
      <SEO
        title="News and Announcements"
        keywords={[`gatsby`, `react`, `bootstrap`]}
      />
      <h1>News and announcements</h1>
      <p>The list below shows an archive of news and announcements</p>
      <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
        {posts.map(post => (
          <Col className="mb-4" key={post.node.slug.current}>
            <NewsArticlePreview
              image={post.node.image?.image}
              title={post.node.title}
              excerpt={post.node.excerpt}
              date={post.node.date}
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
    </Layout>
  );
}

export const pageQuery = graphql`
  query AllNewsQuery($skip: Int!, $limit: Int!) {
    allSanityNewsArticle(
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: date }
    ) {
      edges {
        node {
          slug {
            current
          }
          title
          excerpt
          date
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

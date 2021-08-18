import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { Button, Row, Col } from 'react-bootstrap';
import { FiChevronLeft } from 'react-icons/fi';
import imageUrlBuilder from '@sanity/image-url';
import { graphql } from 'gatsby';
import { serializers } from '../blockContent';
import moment from 'moment';

const builder = imageUrlBuilder({
  projectId: 'i3ln9d71',
  dataset: 'production',
});

const urlFor = source => {
  return builder.image(source._type === 'smImage' ? source.image : source);
};

export default function singlePost({ data }) {
  const post = data.allSanityNewsArticle.edges[0];
  return (
    <Layout>
      <SEO title={post.node.title} />
      <Button
        variant="link"
        className="p-0 mb-4 d-flex justify-content-start align-items-center"
        onClick={() => {
          window.history.back();
        }}
      >
        <FiChevronLeft />
        Back
      </Button>
      <Row className="mb-4">
        <Col md={8}>
          <h1>{post.node.title}</h1>
          <p className="text-muted">
            {moment(post.node.date).format('Do MMM YYYY')}
          </p>
        </Col>
        <Col className="d-flex justify-content-start justify-content-md-end align-items-center">
          {post.node.author._rawProfilePic && (
            <img
              alt={`${post.node.author.name}`}
              className="profile-pic mr-3"
              src={urlFor(post.node.author._rawProfilePic)
                .width(80)
                .height(80)
                .url()}
            />
          )}
          <span className="text-muted">Added by {post.node.author.name}</span>
        </Col>
      </Row>
      {post.node.image && (
        <img
          alt={`${post.node._rawImage.alt}`}
          className="mb-4 rounded w-100"
          src={urlFor(post.node._rawImage)
            .height(350)
            .width(800)
            .url()}
        />
      )}
      <BlockContent
        blocks={post.node._rawArticleText}
        serializers={serializers}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query SingleNewsQuery($id: String!) {
    allSanityNewsArticle(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          slug {
            current
          }
          date
          title
          _rawImage
          image {
            image {
              asset {
                fluid(maxHeight: 350) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
          _rawArticleText
          author {
            name
            _rawProfilePic
          }
        }
      }
    }
  }
`;

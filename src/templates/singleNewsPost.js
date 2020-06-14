import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from 'gatsby-image';
import { Button, Row, Col } from 'react-bootstrap';
import { FiChevronLeft } from 'react-icons/fi';
import imageUrlBuilder from '@sanity/image-url';
import { graphql } from 'gatsby';
import { serializers } from '../../sanity/schemas/blockEditor';
import moment from 'moment';

const builder = imageUrlBuilder({
  projectId: 'i3ln9d71',
  dataset: 'production',
});

const urlFor = source => {
  return builder.image(source);
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
        <Image
          fluid={post.node.image.image.asset.fluid}
          className="mb-4 rounded"
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
          image {
            image {
              asset {
                fluid {
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

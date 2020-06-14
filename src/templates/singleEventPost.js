import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from 'gatsby-image';
import { Button } from 'react-bootstrap';
import { FiChevronLeft } from 'react-icons/fi';
import { serializers } from '../../sanity/schemas/blockEditor';
import { graphql } from 'gatsby';
import moment from 'moment';

export default function singlePost({ data }) {
  const post = data.allSanityEvent.edges[0];
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
      <h1>{post.node.title}</h1>
      <p className="text-muted">
        {moment(post.node.startDate).format(
          `Do MMM ${post.node.showTimes ? ` h:mma` : ``}`
        )}
        {post.node.endDate
          ? ` to ${moment(post.node.endDate).format(
              `Do MMM ${post.node.showTimes ? ` h:mma` : ``}`
            )}`
          : ``}
      </p>
      {post.node.image && (
        <Image
          fluid={post.node.image.image.asset.fluid}
          className="mb-4 rounded"
        />
      )}
      <BlockContent
        blocks={post.node._rawEventDescription}
        serializers={serializers}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query SingleEventQuery($id: String!) {
    allSanityEvent(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          slug {
            current
          }
          startDate
          endDate
          showTimes
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
          _rawEventDescription
        }
      }
    }
  }
`;

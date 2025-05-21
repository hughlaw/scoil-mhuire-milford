import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import { serializers } from '../blockContent';

export default function singlePost({ data }) {
  const post = data.allSanityPage.edges[0];
  return (
    <Layout>
      <SEO title={post.node.title} />
      <h1>{post.node.title}</h1>
      <BlockContent
        blocks={post.node._rawPageContent}
        serializers={serializers}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query SinglePageQuery($id: String!) {
    allSanityPage(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          slug {
            current
          }
          title
          _rawPageContent(resolveReferences: { maxDepth: 5 })
        }
      }
    }
  }
`;

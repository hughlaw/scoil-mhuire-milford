import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import { serializers } from '../blockContent';
import imageUrlBuilder from '@sanity/image-url';
import { Button } from 'react-bootstrap';
import { FiChevronLeft } from 'react-icons/fi';

const builder = imageUrlBuilder({
  projectId: 'i3ln9d71',
  dataset: 'production',
});

const urlFor = source => {
  return builder.image(source);
};

export default function singlePost({ data }) {
  const classPage = data.allSanityClassPage.edges[0];
  return (
    <Layout>
      <SEO title={classPage.node.title} />
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
      <h1 className="text-center">{classPage.node.title}</h1>
      {classPage.node.teacher && (
        <div className="text-center">
          <img
            alt={`${classPage.node.teacher.name}`}
            className="profile-pic mb-2"
            src={urlFor(classPage.node.teacher._rawProfilePic)
              .width(150)
              .height(150)
              .url()}
          />
          <p className="text-muted">{classPage.node.teacher.name}</p>
        </div>
      )}
      <BlockContent
        blocks={classPage.node._rawPageContent}
        serializers={serializers}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query SingleClassPageQuery($id: String!) {
    allSanityClassPage(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          slug {
            current
          }
          title
          teacher {
            name
            _rawProfilePic
          }
          _rawPageContent
        }
      }
    }
  }
`;

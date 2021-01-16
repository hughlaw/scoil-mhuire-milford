import React from 'react';
import Image from 'gatsby-image';
import imageUrlBuilder from '@sanity/image-url';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';
import Carousel from './components/Carousel';
import BlockContent from '@sanity/block-content-to-react';
import { FiDownload } from 'react-icons/fi';

const builder = imageUrlBuilder({
  projectId: 'i3ln9d71',
  dataset: 'production',
});

const urlFor = source => {
  return builder.image(source);
};

export const serializers = {
  types: {
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeId(url);
      const opts = {
        playerVars: {
          iv_load_policy: 3,
          modestbranding: 1,
        },
      };
      return (
        <ResponsiveEmbed aspectRatio="16by9" className="my-4">
          <YouTube videoId={id} opts={opts} />
        </ResponsiveEmbed>
      );
    },
    smImage: ({ node }) => {
      return (
        <Image
          alt={node.alt}
          className="my-4 rounded"
          fluid={{
            aspectRatio: 1.75,
            srcSet: `${urlFor(node.image)
              .width(200)
              .fit('crop')
              .url()} 200w,
            ${urlFor(node.image)
              .width(400)
              .fit('crop')
              .url()} 400w,
            ${urlFor(node.image)
              .width(800)
              .fit('crop')
              .url()} 800w,
            ${urlFor(node.image)
              .width(1200)
              .fit('crop')
              .url()} 1200w,
            ${urlFor(node.image)
              .width(1600)
              .fit('crop')
              .url()} 1600w,
            ${urlFor(node.image)
              .width(2400)
              .fit('crop')
              .url()} 2400w,
            ${urlFor(node.image).url()} 6000w,`,
            sizes: '(max-width: 800px) 100vw, 800px',
            src: urlFor(node.image).url(),
          }}
        />
      );
    },
    slideshow: ({ node }) => {
      return (
        <>
          {node.title && <h3>{node.title}</h3>}
          {node.intro && (
            <BlockContent blocks={node.intro} serializers={serializers} />
          )}
          <Carousel slides={node.images} />
        </>
      );
    },
    attachment: ({ node }) => {
      return (
        <span className="d-flex my-3">
          <FiDownload />
          <a
            className="h6 ml-2 mb-0"
            href={`${node.attachmentDocument.asset.url}?dl=`}
          >
            {node.name}
          </a>
        </span>
      );
    },
  },
};

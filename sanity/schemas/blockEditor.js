import React from 'react';
import { FiImage, FiYoutube } from 'react-icons/fi';
import Image from 'gatsby-image';
import imageUrlBuilder from '@sanity/image-url';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import { ResponsiveEmbed } from 'react-bootstrap';

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
            srcSet: `${urlFor(node.image.asset)
              .width(200)
              .fit('crop')
              .url()} 200w,
            ${urlFor(node.image.asset)
              .width(400)
              .fit('crop')
              .url()} 400w,
            ${urlFor(node.image.asset)
              .width(800)
              .fit('crop')
              .url()} 800w,
            ${urlFor(node.image.asset)
              .width(1200)
              .fit('crop')
              .url()} 1200w,
            ${urlFor(node.image.asset)
              .width(1600)
              .fit('crop')
              .url()} 1600w,
            ${urlFor(node.image.asset)
              .width(2400)
              .fit('crop')
              .url()} 2400w,
            ${urlFor(node.image.asset).url()} 6000w,`,
            sizes: '(max-width: 800px) 100vw, 800px',
            src: urlFor(node.image.asset).url(),
          }}
        />
      );
    },
  },
};

export const smBlock = {
  name: 'sm-block',
  title: 'Block content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
      ],
      marks: {
        decorators: [
          { title: 'String', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
      },
    },
    {
      type: 'smImage',
      icon: FiImage,
    },
    {
      type: 'youtube',
      icon: FiYoutube,
    },
  ],
};

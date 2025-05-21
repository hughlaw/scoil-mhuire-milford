import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'gatsby';
import moment from 'moment';
import imageUrlBuilder from '@sanity/image-url';
import newsPlaceholder from '../images/news-placeholder.jpg';

const builder = imageUrlBuilder({
  projectId: 'i3ln9d71',
  dataset: 'production',
});

const urlFor = source => {
  return builder.image(source?._type === 'smImage' ? source.image : source);
};

export default function NewsArticle({ image, title, excerpt, date, slug }) {
  return (
    <Card as="article">
      <Link to={`/news/${slug}`}>
        {image && (
          <Card.Img
            variant="top"
            src={urlFor(image)
              .height(150)
              .width(200)
              .url()}
          />
        )}
        {!image && <Card.Img variant="top" src={newsPlaceholder} />}
        <Card.Body>
          <Card.Title as="h1" className="h4">
            {title}
          </Card.Title>
          <Card.Subtitle as="time" className="text-muted">
            {moment(date).format('Do MMM YYYY')}
          </Card.Subtitle>
          {excerpt && <p>{excerpt}</p>}
        </Card.Body>
      </Link>
    </Card>
  );
}

import React from 'react';
import { Card } from 'react-bootstrap';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import moment from 'moment';

export default function NewsArticle({ image, title, excerpt, date, slug }) {
  return (
    <Card as="article">
      <Link to={`/news/${slug}`}>
        {image && <Card.Img variant="top" as={Img} fluid={image.asset.fluid} />}
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

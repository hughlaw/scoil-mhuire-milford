import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import moment from 'moment';

export default function EventPreview({
  image,
  title,
  excerpt,
  startDate,
  endDate,
  showTimes,
  slug,
}) {
  return (
    <Card as="article">
      <Link to={`/events/${slug}`}>
        {image && <Card.Img variant="top" as={Img} fluid={image.asset.fluid} />}
        <Card.Body>
          <Card.Title as="h1" className="h4">
            {title}
          </Card.Title>
          <Card.Subtitle as="time" className="text-muted">
            {moment(startDate).format(`Do MMM ${showTimes ? ` h:mma` : ``}`)}
            {endDate
              ? ` to ${moment(endDate).format(
                  `Do MMM ${showTimes ? ` h:mma` : ``}`
                )}`
              : ``}
          </Card.Subtitle>
          {excerpt && <p>{excerpt}</p>}
        </Card.Body>
      </Link>
    </Card>
  );
}

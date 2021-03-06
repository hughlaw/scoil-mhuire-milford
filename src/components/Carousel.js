import React, { useEffect, useState } from 'react';
import { useEmblaCarousel } from 'embla-carousel-react';
import Image from 'gatsby-image';
import imageUrlBuilder from '@sanity/image-url';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import styled from 'styled-components';

const builder = imageUrlBuilder({
  projectId: 'i3ln9d71',
  dataset: 'production',
});

const urlFor = source => {
  return builder.image(source);
};

const Caption = styled.figcaption`
  bottom: 0px;
  text-align: center;
  justify-self: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
`;

const Carousel = ({ slides }) => {
  const [hideLeftArrow, setHideLeftArrow] = useState(false);
  const [hideRightArrow, setHideRightArrow] = useState(false);

  const [EmblaCarouselReact, embla] = useEmblaCarousel({
    loop: false,
  });

  useEffect(() => {
    const checkArrows = () => {
      const currentSlide = embla.selectedScrollSnap() + 1;
      const numSlides = embla.slideNodes().length;
      setHideLeftArrow(currentSlide === 1);
      setHideRightArrow(currentSlide === numSlides);
    };

    if (embla) {
      embla.on('select', checkArrows);
      embla.on('init', checkArrows);
    }
  }, [embla]);

  return (
    <div style={{ position: 'relative' }} className="mb-5">
      {!hideLeftArrow && (
        <button
          className="btn btn-link embla__control left"
          onClick={() => embla.scrollPrev()}
        >
          <FiChevronLeft />
        </button>
      )}
      {!hideRightArrow && (
        <button
          className="btn btn-link embla__control right"
          onClick={() => embla.scrollNext()}
        >
          <FiChevronRight />
        </button>
      )}
      <EmblaCarouselReact className="embla rounded">
        <div className="embla__container">
          {slides &&
            slides.map(slide => {
              return (
                <figure
                  key={slide._key}
                  className="embla__slide"
                  style={{ flex: '0 0 100%', margin: '0' }}
                >
                  <Image
                    className=""
                    alt={slide.alt}
                    fluid={{
                      aspectRatio: 1.75,
                      srcSet: `${urlFor(slide.image)
                        .width(200)
                        .url()} 200w,
                      ${urlFor(slide.image)
                        .width(400)
                        .url()} 400w,
                      ${urlFor(slide.image)
                        .width(800)
                        .url()} 800w,
                      ${urlFor(slide.image)
                        .width(1200)
                        .url()} 1200w,
                      ${urlFor(slide.image)
                        .width(1600)
                        .url()} 1600w,
                      ${urlFor(slide.image)
                        .width(2400)
                        .url()} 2400w,
                      ${urlFor(slide.image).url()} 6000w,`,
                      sizes: '(max-width: 800px) 100vw, 800px',
                      src: urlFor(slide.image).url(),
                    }}
                  />
                  {slide.caption && <Caption>{slide.caption}</Caption>}
                </figure>
              );
            })}
        </div>
      </EmblaCarouselReact>
    </div>
  );
};

export default Carousel;

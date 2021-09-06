import React, { useCallback, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from 'react-images';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  margin: 2rem 0;
`

export default function GridGallery({slides}) {

  const builder = imageUrlBuilder({
    projectId: 'i3ln9d71',
    dataset: 'production',
  });

  const urlFor = source => {
    return builder.image(source);
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const images = slides.map((slide, i) => {
    return {
        src: urlFor(slide.image)
          .width(1200)
          .url(),
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
        thumbnail: urlFor(slide.image)
          .width(400)
          .url(),
        width: 3,
        height: 4,
        enableImageSelection: false,
        alt: slide.caption,
        key: `gallery-image-${i}`
    }
  })

  return (
    <GalleryContainer>
      <Gallery photos={images} targetRowHeight={100} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={images.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </GalleryContainer>
  )
}

import React from "react";
import styled from "styled-components";
import * as basicLightbox from 'basiclightbox'
import PropTypes from "prop-types";

const StyledGallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`
const StyledImageGalleryItem = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover{
  transform: scale(1.03);
  cursor: zoom-in;
  }
`
let instance;
const openLightbox = ({ largeImageURL, tags }) => {
  const content =
    `<div class="overlay">
    <div class="modal">
      <img src=${largeImageURL} alt=${tags} />
    </div>
  </div>`
  instance = basicLightbox.create(content)
  instance.show()
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    instance.close();
  }
});

export const ImageGallery = ({ images }) => {
  return (
    <StyledGallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <StyledImageGalleryItem key={id}>
          <StyledImage src={webformatURL} alt={tags} onClick={() => openLightbox({ largeImageURL, tags })} />
        </StyledImageGalleryItem>
      ))}
    </StyledGallery>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
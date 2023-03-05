import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledHeader } from "./Header";
import { SearchBar } from "./SearchBar";
import { fetchImages } from "services/api";
import { ImageGallery } from "./ImageGallery";
import { Loader } from "./Loader";
import { Error } from "./Error";
import { StyledButton } from "./Button";

const StyledApp = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
    padding-bottom: 24px;
`
export const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [lastPage, setLastPage] = useState(1);

  const handleSubmit = (query) => {
    setQuery(query);
    setPage(1);
  }

  useEffect(() => {
    const handleImagesRequest = async () => {
      setIsLoading(true)

      try {
        const fetchedData = await fetchImages(query, page);

        const lastPage = Math.ceil(fetchedData.total / 12);
        setLastPage(lastPage);

        if (page === 1) {
          setImages(fetchedData.hits)
        } else {
          setImages(prevState => ([...prevState, ...fetchedData.hits])
          );
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false);
      }
    }
    if (query) {
      handleImagesRequest();
    }
  }, [query, page])

  useEffect(() => {
    if (page === 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);


  const handleClick = () => {
    setPage(page + 1)
  }

  return (
    <StyledApp>
      <StyledHeader>
        <SearchBar handleSubmit={handleSubmit} />
      </StyledHeader>
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {page !== lastPage && images.length > 0 && !isLoading
        ?
        <StyledButton onClick={handleClick}>Load More</StyledButton>
        : null}
      {images.length === 0 && query && !isLoading && <Error text="Nothing found! Try again" />}
      {error && <Error text="An error occurred. Please try again" />}
    </StyledApp>
  );
};

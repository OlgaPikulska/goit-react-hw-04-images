import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { StyledHeader } from "./Header";
import { SearchBar } from "./SearchBar";
import { fetchImages } from "services/api";
import { ImageGallery } from "./ImageGallery";

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


  const handleSubmit = (query) => {
    setQuery(query)
  }

  const handleImagesRequest = async ({ searchQuery = query, currentPage = page } = {}) => {
    setIsLoading(true)

    try {
      const fetchedData = await fetchImages({ inputValue: searchQuery, page: currentPage });

      const lastPage = Math.ceil(fetchedData.total / 12);

      if (page === 1) {
        setImages(fetchedData.hits)
      } else {
        setImages(prevState => ([...prevState, fetchedData.hits]));

      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("Mounting phase");
    if (query !== "") {
      handleImagesRequest();
    }
  }, [query]);


  return (
    <StyledApp>
      <StyledHeader>
        <SearchBar handleSubmit={handleSubmit} />
      </StyledHeader>
      <ImageGallery images={images} />
    </StyledApp>
  );
};

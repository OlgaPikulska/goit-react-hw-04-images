import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledParagraph = styled.p`
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-size: bold;
`

export const Error = ({ text }) => {
    return <StyledParagraph>{text}</StyledParagraph>
};

Error.propTypes = {
    text: PropTypes.string.isRequired,
}
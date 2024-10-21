import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? "#333" : "transparent")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.active ? "#333" : "#f0f0f0")};
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <PaginationContainer>
            <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                {"<"}
            </PageButton>

            {pageNumbers.map((number) => (
                <PageButton key={number} onClick={() => onPageChange(number)} active={currentPage === number}>
                    {number}
                </PageButton>
            ))}

            <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                {">"}
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;

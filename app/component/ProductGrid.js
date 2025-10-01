"use client";
import styled from "styled-components";

const ProductsGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;

  }
`;

export default ProductsGrid;

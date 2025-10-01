"use client";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
  /* display: flex; */
  flex-direction: column;
  gap: 10px;
`;

const Box = styled.div`
  background-color: white;
  padding: 20px;
  height: 200px;
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;

const Title = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
`;

export default function ProductBox({ product }) {
  const uri = "/products/" + product._id;

  const { addProduct } = useContext(CartContext);

  return (
    <ProductWrapper>
      <Box>
        <a href={uri}>
          <img src={product.images[0]} />
        </a>
      </Box>
      <Title href={uri}>{product.title}</Title>
      <PriceRow>
        <Price>${product.price}</Price>
        <Button
          $primary
          $outline
          $shiftLeft
          onClick={() => addProduct(product._id)}
        >
          {" "}
          Add to cart{" "}
        </Button>
      </PriceRow>
    </ProductWrapper>
  );
}

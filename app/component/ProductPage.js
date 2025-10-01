"use client";

import Header from "@/app/component/Header";
import Center from "@/app/component/Center";
import Title from "@/app/component/Title";
import Box from "./Box";
import ColumnsWrapper from "./ColumnWrapper";
import styled from "styled-components";
import ProductImages from "./ProductImages";
import Button from "./Button";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export default function ProductPageContent({ product }) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <ProductImages images={product.images}></ProductImages>
          </Box>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>${product.price}</Price>
              <Button
                $primary
                $size="l"
                onClick={() => addProduct(product._id)}
              >
                Add to Cart
              </Button>
            </PriceRow>
          </div>
        </ColumnsWrapper>
      </Center>
    </>
  );
}

"use client";
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 0.8rem;
`;

const Desc = styled.p`
  color: #aaa;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;

  img {
    max-height: 300px;
    display: block;
    margin: 0 auto;
  }

  div: nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div: nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  /* padding: 20px; */
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div className="flex flex-col gap-4">
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={`/products/${product._id}`}
                  $size="l"
                  $white
                  $outline
                >
                  Read more
                </ButtonLink>
                <Button
                  $white
                  $size="l"
                  onClick={() => addProduct(product._id)}
                >
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src="https://next-ecommerce-yl.s3.ap-southeast-2.amazonaws.com/1758252368628.3208.png"
              alt=""
            ></img>
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
}

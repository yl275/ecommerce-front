"use client";
import { useState } from "react";
import styled from "styled-components";

const BigImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  pbject-fix: contain;
`;

const Images = styled.div`
  display: flex;
  /* grid-template-colums: 1fr 1fr 1fr; */
  gap: 10px;
`;

const ImageButton = styled.div`
  border: 1px solid #aaa;
  max-width: 20%;
  cursor: pointer;
  padding: 10px;
  border-radius: 15px;

  ${(props) =>
    props.$active
      ? `border-color: red;`
      : `border-color: transparent;
    opacity: .7;
    `}
`;

const BigImageWrapper = styled.div`
  width: 100%; // 或固定宽度
  height: 500px; // 和 BigImage 一致
  text-align: cetner;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage}></BigImage>
      </BigImageWrapper>
      <Images>
        {images.map((image, _) => (
          <ImageButton
            $active={image === activeImage}
            key={image}
            onClick={() => setActiveImage(image)}
          >
            <img src={image} alt="" />
          </ImageButton>
        ))}
      </Images>
    </>
  );
}

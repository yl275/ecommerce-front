"use client";
import styled, { css } from "styled-components";
import { primary } from "../lib/colors";
import { poppins } from "next/font/google";

export const ButtonStyle = css`
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  background-color: #ebeced;
  svg {
    height: 20px;
    margin-left: 5px;
  }
  white-space: nowrap;

  ${(props) =>
    props.$size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 5px 10px;
      svg {
        height: 24px;
      }
    `}

  ${(props) =>
    props.$primary &&
    css`
      background-color: ${primary};
      color: #fff;
      gap: 5px;
    `}

    ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 2px solid #fff;
      padding: 5px 15px;
    `}

    ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

    ${(props) =>
    props.$black &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 2px solid #000;
      padding: 5px 15px;
    `}

    ${(props) =>
    props.$black &&
    !props.$outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
    
    ${(props) =>
    props.$primary &&
    props.$outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 2px solid ${primary};
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

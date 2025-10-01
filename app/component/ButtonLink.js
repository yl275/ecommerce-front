"use client";
import Link from "next/link";
import { ButtonStyle } from "./Button";
import styled from "styled-components";

const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

export default function ButtonLink({ children, ...props }) {
  return <StyledLink {...props}>{children}</StyledLink>;
}

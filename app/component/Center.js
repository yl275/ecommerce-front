"use client";
import styled from "styled-components";

const StyledDiv = styled.div`
  justify-content: center;
  align-items: center;
  margin: 0 5%;
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

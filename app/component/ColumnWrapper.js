"use client";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1.3fr ;

  margin-top: 40px;
  @media screen and (min-width: 768px){
  grid-template-columns: 1.3fr 0.7fr;

  }
`;

export default ColumnsWrapper;

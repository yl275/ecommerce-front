"use client";
import { Roboto } from "next/font/google";
import { createGlobalStyle } from "styled-components";
import { Poppins } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #ccc;
        margin: 0;
        padding: 0;
        font-family: ${poppins.style.fontFamily};
    },
    h1{
        font-weight: 700;
        font-size: 2.5rem;
    }
    h2{
        font-weight: 700;
        font-size: 1.5rem;
    }
    input{
      border: 2px solid #aaa;
      border-radius: 2px;
    }

`;

export default function StyledLayout({ children }) {
  return <GlobalStyle />;
}

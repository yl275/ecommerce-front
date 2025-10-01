"use client";
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/BarsIcon";
import { useState } from "react";

const StyledHeader = styled.header`
  background-color: #222;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 15px 0;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.$mobilenavActive
      ? `
    display: block;
  `
      : `display: none`};
  gap: 10px;
  padding: 20px;
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0px;
  right: 0;
  padding: 50px 20px;
  padding-left: 35px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 20px;
  height: 20px;
  color: white;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
  position: relative;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobilenavActive, setMobilenavActive] = useState(false);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <StyledLink href="/">Ecommerce</StyledLink>
          <StyledNav $mobilenavActive={mobilenavActive}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">All products</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/account">Account</NavLink>

            <NavLink href="/cart">Cart ({cartProducts?.length})</NavLink>
          </StyledNav>

          <NavButton onClick={() => setMobilenavActive((prev) => !prev)}>
            <BarsIcon></BarsIcon>
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

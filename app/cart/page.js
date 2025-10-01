"use client";
import Header from "../component/Header";
import styled from "styled-components";
import Center from "../component/Center";
import Button from "../component/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../component/CartContext";
import axios from "axios";
import Table from "../component/Table";
import Input from "../component/Input";
import Box from "../component/Box";
import ColumnsWrapper from "../component/ColumnWrapper";

const ProductInfoBox = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  max-width: 130px;
  max-height: 130px;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100px;
    max-height: 100px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, subtractProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");

  function addProductByOne(productId) {
    addProduct(productId);
  }

  function subtractProductByOne(productId) {
    subtractProduct(productId);
  }

  function goToCheckout() {
    axios
      .post("/api/checkout", {
        name,
        email,
        city,
        postalCode,
        country,
        address,
        address2,
        cartProducts,
      })
      .then((response) => {
        window.location.href = response.data;
      });
  }

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total +=
      products[i].price *
      cartProducts.filter((id) => id === products[i]._id).length;
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setTimeout(() => {
        clearCart();
      }, 3000);
    }
  }, []);

  if (
    typeof window !== "undefined" &&
    window.location.href.includes("success")
  ) {
    setTimeout(() => {
      clearCart();
    }, 3000);

    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will send you an email with your order details</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  } else if (
    typeof window !== "undefined" &&
    window.location.href.includes("canceled")
  ) {
    alert("Payment canceled");
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!products?.length && <div>No products in the cart.</div>}
            {products?.length > 0 && (
              <>
                <h2>Products</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoBox>
                          <ProductImageBox>
                            <img src={product.images[0]} alt={product.title} />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoBox>
                        <td>
                          <Button
                            onClick={() => subtractProductByOne(product._id)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>
                          <Button onClick={() => addProductByOne(product._id)}>
                            +
                          </Button>
                        </td>
                        <td>${product.price}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Total:</td>
                      <td></td>
                      <td>${total}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>

          {products?.length > 0 && (
            <Box>
              <h2>Order Summary</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Address"
                value={address}
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Address 2"
                value={address2}
                name="address2"
                onChange={(e) => setAddress2(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button $black onClick={goToCheckout}>
                Continue to checkout
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

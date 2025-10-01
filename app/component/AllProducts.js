"use client";
import Center from "./Center";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductGrid";
import Title from "./Title";

export default function AllProducts({ products }) {
  return (
    <Center>
      <Title>All Products</Title>

      <ProductsGrid>
        {products &&
          products.map((product) => (
            <ProductBox key={product._id} product={product} />
          ))}
      </ProductsGrid>
    </Center>
  );
}

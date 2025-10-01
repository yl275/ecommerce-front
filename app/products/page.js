import Header from "../component/Header";
import { mongooseConnect } from "../lib/mongoose";
import Product from "../models/product";
import AllProducts from "../component/AllProducts";

export default async function ProductsPage() {
  mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: -1 } });

  return (
    <>
      <Header />
      <AllProducts products={JSON.parse(JSON.stringify(allProducts))} />
    </>
  );
}

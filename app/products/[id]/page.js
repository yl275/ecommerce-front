import ProductPageContent from "@/app/component/ProductPage";
import { mongooseConnect } from "@/app/lib/mongoose";
import Product from "@/app/models/product";

export default async function ProductPage({ params }) {
  const { id } = await params;
  mongooseConnect();

  const product = await Product.findById(id);

  return (
    <>
      <ProductPageContent
        product={JSON.parse(JSON.stringify(product))}
      ></ProductPageContent>
    </>
  );
}

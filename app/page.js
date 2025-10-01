import Featured from "./component/Featured";
import Header from "./component/Header";
import Product from "./models/product";
import { mongooseConnect } from "./lib/mongoose";
import NewProduct from "./component/NewProduct";

export default async function HomePage() {
  const featuredProductId = "68cccd617ca65b4b3726d792";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);

  const newProducts = await Product.find({}, null, {
    sort: { createdAt: -1 },
    limit: 8,
  });

  return (
    <div>
      <Header />
      <Featured product={JSON.parse(JSON.stringify(product))} />
      <NewProduct products={JSON.parse(JSON.stringify(newProducts))} />
    </div>
  );
}

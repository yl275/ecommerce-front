import { mongooseConnect } from "@/app/lib/mongoose";
import Product from "@/app/models/product";

export async function POST(request) {
  await mongooseConnect();
  const { ids } = await request.json();
  const products = await Product.find({ _id: { $in: ids } });
  console.log(products);
  return Response.json(products);
}

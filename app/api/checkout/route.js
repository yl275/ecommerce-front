import { mongooseConnect } from "@/app/lib/mongoose";
import Product from "@/app/models/product";
import Order from "@/app/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(request) {
  const {
    name,
    email,
    city,
    postalCode,
    country,
    address,
    address2,
    cartProducts,
  } = await request.json();

  await mongooseConnect();
  const uniqueIds = [...new Set(cartProducts)];
  const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId,
    );
    const quantity = cartProducts.filter((id) => id === productId).length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    name,
    email,
    city,
    postalCode,
    country,
    address,
    address2,
    line_items,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=true`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=true`,
    metadata: { orderId: orderDoc._id.toString() },
  });

  return Response.json(session.url);
}

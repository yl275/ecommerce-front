import { mongooseConnect } from "@/app/lib/mongoose";

// const stripe = require("stripe")(process.env.STRIPE_SK);
import Order from "@/app/models/Order";

export const config = { api: { bodyParser: false } };

export async function POST(request) {
  await mongooseConnect();
  const stripeSecretKey = process.env.STRIPE_SK;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    console.error("Missing STRIPE_SK environment variable");
    return new Response("Server misconfiguration", { status: 500 });
  }

  const stripe = require("stripe")(stripeSecretKey);
  let event;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    // const signature = request.headers["stripe-signature"];
    const signature = request.headers.get("stripe-signature"); // fix header access

    try {
      const rawBody = await request.text();
      event = stripe.webhooks.constructEvent(
        // request.body,
        rawBody,
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return new Response("error", { status: 400 });
    }
  }

  switch (event.type) {
    case "checkout.session.completed":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      const { orderId } = paymentIntent.metadata;
      const paid = paymentIntent.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response("ok", { status: 200 });
}

// relish-liking-clever-safe

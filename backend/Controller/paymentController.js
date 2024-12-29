const stripe = require("stripe")(
  "sk_test_51QUL94HwweQbV7WY0tPi6b59zDHJNmnFxfwLO1eVykDKawdUz0pfQ56yCvf4r5TDTpr6grOUIH9Ze8ZczL3wsFRU00Nv6YQSLD"
);
const asyncHandler = require("express-async-handler");

const buyProduct = asyncHandler(async (req, res) => {
  const { name, price, imgUrl } = req.body;

  const lineItems = [
    {
      price_data: {
        currency: "USD",
        product_data: {
          // Corrected the typo here
          name: name,
          images: [imgUrl],
        },
        unit_amount: price * 100, // Stripe expects amounts in cents
      },
      quantity: 1,
    },
  ];

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: lineItems, // Correct parameter
    mode: "payment",
    success_url: "http://localhost:3000/marketplace",
    cancel_url: "http://localhost:3000/marketplace",
  });

  res.json({
    url: stripeSession.url,
  }); // Send the session URL as JSON
});

module.exports = {
  buyProduct,
};

import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

// Initialize dotenv for environment variables
dotenv.config();

// Initialize Express router
const router = express.Router();

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  try {
    // Create the payment charge
    const stripeResponse = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    });

    // Send success response
    res.status(200).json(stripeResponse);
  } catch (error) {
    // Send error response
    res.status(500).json(error);
  }
});

export default router;

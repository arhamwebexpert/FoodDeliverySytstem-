import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get latest order
router.get("/latest", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
router.post("/", auth, async (req, res) => {
  try {
    const { shippingAddress, paymentDetails } = req.body;
    const userId = req.user._id;

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order items from cart items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Calculate total amount
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Create new order
    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentDetails,
    });

    await order.save();

    // Clear the cart after successful order
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], total: 0 } }
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific order
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel order
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        message: "Cannot cancel order that is not in pending status",
      });
    }

    order.status = "cancelled";
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

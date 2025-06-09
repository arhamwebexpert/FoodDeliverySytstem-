import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const defaultProducts = [
  {
    name: "Classic Burger",
    description:
      "Juicy beef patty with fresh lettuce, tomatoes, and special sauce",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop",
    category: "Burgers",
    isAvailable: true,
  },
  {
    name: "Margherita Pizza",
    description:
      "Traditional pizza with tomato sauce, mozzarella, and fresh basil",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&h=500&fit=crop",
    category: "Pizza",
    isAvailable: true,
  },
  {
    name: "California Roll",
    description:
      "Fresh crab meat, avocado, and cucumber wrapped in rice and seaweed",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=500&fit=crop",
    category: "Sushi",
    isAvailable: true,
  },
  {
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce, parmesan cheese, croutons with Caesar dressing",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=500&fit=crop",
    category: "Salads",
    isAvailable: true,
  },
  {
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, parmesan cheese, and black pepper",
    price: 11.99,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=500&fit=crop",
    category: "Pasta",
    isAvailable: true,
  },
  {
    name: "Chicken Wings",
    description:
      "Crispy wings with choice of buffalo, BBQ, or honey garlic sauce",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&h=500&fit=crop",
    category: "Appetizers",
    isAvailable: true,
  },
  {
    name: "Fish and Chips",
    description: "Crispy battered fish with golden fries and tartar sauce",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=500&fit=crop",
    category: "Seafood",
    isAvailable: true,
  },
  {
    name: "Vegetable Stir Fry",
    description: "Assorted fresh vegetables in savory sauce with steamed rice",
    price: 10.99,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
    category: "Vegetarian",
    isAvailable: true,
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake with ganache frosting",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop",
    category: "Desserts",
    isAvailable: true,
  },
  {
    name: "Ice Cream Sundae",
    description:
      "Vanilla ice cream with chocolate sauce, whipped cream, and nuts",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=500&fit=crop",
    category: "Desserts",
    isAvailable: true,
  },
  {
    name: "Chicken Sandwich",
    description: "Grilled chicken breast with lettuce, tomato, and mayo",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&h=500&fit=crop",
    category: "Sandwiches",
    isAvailable: true,
  },
  {
    name: "Greek Salad",
    description: "Fresh vegetables with feta cheese, olives, and olive oil",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",
    category: "Salads",
    isAvailable: true,
  },
  {
    name: "Beef Steak",
    description: "Grilled beef steak with vegetables and mashed potatoes",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500&h=500&fit=crop",
    category: "Main Course",
    isAvailable: true,
  },
  {
    name: "Shrimp Pasta",
    description: "Linguine pasta with garlic shrimp and white wine sauce",
    price: 16.99,
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=500&fit=crop",
    category: "Pasta",
    isAvailable: true,
  },
  {
    name: "Fruit Smoothie",
    description: "Blend of fresh fruits with yogurt and honey",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=500&h=500&fit=crop",
    category: "Beverages",
    isAvailable: true,
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/food-delivery"
    );
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    const insertedProducts = await Product.insertMany(defaultProducts);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedProducts();

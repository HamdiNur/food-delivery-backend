import userModel from "../models/userModel.js";

//Add items to user Cart

// ✅ Add to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // get from middleware
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    // ✅ Fix the logic
    if (cartData[itemId]) {
      cartData[itemId] += 1; // increase count
    } else {
      cartData[itemId] = 1; // first time
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};


//remove items fro user Cart 

const removeFromCart = async (req, res) => {
  try {
  const userId = req.userId;           // ✅ not from req.body
    const { itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    // decrement or remove completely
    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};


//Fetch user data


const getCart = async (req, res) => {
  try {
const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};


export {addToCart,removeFromCart,getCart}
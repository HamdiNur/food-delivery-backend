import userModel from "../models/userModel.js";

//Add items to user Cart

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Make sure both values exist
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If cartData doesn’t exist yet, initialise it
    const cartData = userData.cartData || {};

    // Add or increment item count
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};


//remove items fro user Cart 

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

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
    const { userId } = req.body;

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
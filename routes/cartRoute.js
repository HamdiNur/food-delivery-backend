import express from "express"
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const userRouter=express.Router()

userRouter.post("/add",addToCart)
userRouter.post("/remove",removeFromCart)
userRouter.post("/get",getCart)


export default cartRouter;
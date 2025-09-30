import express from "express"
import { placedOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter=express.Router()



orderRouter.post("/place",authMiddleware,placedOrder)


export default orderRouter;
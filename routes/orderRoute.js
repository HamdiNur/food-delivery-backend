import express from "express"
import { listOrders, placedOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter=express.Router()



orderRouter.post("/place",authMiddleware,placedOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders", authMiddleware, userOrders)
orderRouter.get("/list",listOrders )
orderRouter.post("/status",updateStatus )

export default orderRouter;
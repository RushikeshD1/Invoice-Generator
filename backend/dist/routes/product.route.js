import express from "express";
import { fetchProduct, postProduct } from "../controllers/product.controller.js";
const router = express.Router();
router.post("/create", postProduct);
router.get("/fetch", fetchProduct);
export default router;
//# sourceMappingURL=product.route.js.map
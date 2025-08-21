import express from "express";
import { generateInvoice } from "../controllers/invoice.controller.js";
const router = express.Router();
router.get("/generate", generateInvoice);
export default router;
//# sourceMappingURL=invoice.route.js.map
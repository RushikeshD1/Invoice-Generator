import express from "express";
const router = express.Router();
router.post("/register", (req, res) => {
    res.status(200).json({
        success: true,
        message: "user registed successfully"
    });
});
export default router;
//# sourceMappingURL=userRoutes.js.map
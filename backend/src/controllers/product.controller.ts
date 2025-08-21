import type { Request, Response } from "express";
import Product from "../models/product.model.js";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const postProduct = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { productName, productQty, productRate } = req.body;

        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID not found.",
            });
        }

        if (!productName || !productQty || !productRate) {
            return res.status(400).json({
            success: false,
            message: "Please fill all fields!",
            });
        }

        const newProduct = await Product.create({
            productName,
            productQty,
            productRate,
            userId
        })

        return res.status(200).json({
            success : true,
            message : "Product added successfully!",
            newProduct
        })
        
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the product.",
        });
    }  
};

export const fetchProduct = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID not found.",
            });
        }

        const products = await Product.find({ userId });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
            });
        }

        let subTotal = 0;
        products.forEach((p) => {
            subTotal += p.productQty * p.productRate;
        });

        const totalInclGst = subTotal * 1.18;

        return res.status(200).json({
            success: true,
            message : "Poducts fetch successfully!",
            products,
            subTotal,
            totalInclGst,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching products"
        });
    }
}
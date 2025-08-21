import type { Request, Response } from "express";
import User from "../models/user.model.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields!"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists."
            });
        }
        
        const newUser = await User.create({
            name : name,
            email : email,
            password: password
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully!",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later."
        });
    }
};
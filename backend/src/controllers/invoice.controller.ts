import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import pdf from "pdf-creator-node";

export const generateInvoice = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId).lean();
    const products = await Product.find({ userId }).lean();

    if (!user || !products.length) {
      return res.status(400).json({ success: false, message: "Missing user/products" });
    }

    const subTotal = products.reduce((acc, p) => acc + (p.productQty * p.productRate), 0);
    const gstRate = 0.18;
    const totalInclGst = subTotal * (1 + gstRate);
    const today = new Date().toISOString().split("T")[0];

    // HTML template (can also be a separate .hbs file)
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width:100%; border-collapse:collapse; margin-bottom:20px; }
            th, td { border:1px solid #eee; padding:8px; text-align:center; }
            th { background:#141e30; color:white; }
          </style>
        </head>
        <body>
          <h2>Invoice for {{name}}</h2>
          <p>Date: {{date}}</p>
          <table>
            <tr>
              <th>Product</th><th>Qty</th><th>Rate</th><th>Total</th>
            </tr>
            {{#each products}}
            <tr>
              <td>{{productName}}</td>
              <td>{{productQty}}</td>
              <td>₹ {{productRate}}</td>
              <td>₹ {{calcTotal productQty productRate}}</td>
            </tr>
            {{/each}}
          </table>
          <h3>Total: ₹ {{totalInclGst}}</h3>
        </body>
      </html>
    `;

    // PDF document configuration
    const document = {
      html,
      data: {
        name: user.name,
        date: today,
        products,
        totalInclGst: totalInclGst.toFixed(2),
      },
      path: "./invoice.pdf",
      type: "buffer", // return as buffer to send via HTTP
      options: { format: "A4", orientation: "portrait", border: "10mm" },
    };

    // Add helper for calculation
    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      type: "buffer",
      // helpers can be defined here
      helpers: {
        calcTotal: function(qty: number, rate: number) {
          return (qty * rate).toFixed(2);
        }
      }
    };

    const pdfBuffer = await pdf.create(document, options);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${userId}.pdf`
    });
    res.send(pdfBuffer);

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

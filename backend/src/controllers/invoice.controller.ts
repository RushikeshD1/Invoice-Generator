import type { Request, Response } from "express";
import fs from "fs";
import { chromium } from "playwright";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const generateInvoice = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const products = await Product.find({ userId }).lean();
    if (!products?.length) return res.status(400).json({ success: false, message: "No products found" });

    const safeNum = (v: any) => (typeof v === "number" ? v : Number(v) || 0);
    const subTotal = products.reduce((acc: number, p: any) => acc + safeNum(p.productQty) * safeNum(p.productRate), 0);
    const gstRate = 0.18;
    const totalInclGst = subTotal * (1 + gstRate);
    const today = new Date().toISOString().split("T")[0];

    const html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; margin:0; padding:0; }
          .container { padding:24px; max-width:900px; margin:0 auto; }
          .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
          .brand { font-weight:700; font-size:22px; }
          .invoice-title { font-size:18px; font-weight:700; text-align:right; }
          .user-info { background:#181717; color:#fff; padding:16px; border-radius:10px; display:flex; justify-content:space-between; margin-bottom:18px; }
          table { width:100%; border-collapse:collapse; margin-bottom:18px; }
          th, td { padding:10px; border:1px solid #eee; text-align:center; font-size:13px; }
          th { background: linear-gradient(90deg, #141e30, #243b55); color:#fff; }
          tr:nth-child(even) td { background:#fafafa; }
          .totals { float:right; width:300px; border-radius:8px; border:1px solid #ddd; padding:12px; }
          .totals p { margin:8px 0; font-size:14px; }
          .totals .amount { font-size:18px; font-weight:700; color:#0070f3; }
          .footer { margin-top:30px; padding:12px; background:#141e30; color:#fff; border-radius:8px; text-align:center; font-size:12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="brand">Levitation Infotech</div>
            <div class="invoice-title">
              INVOICE<br/>
              <span class="meta">Generated: ${today}</span>
            </div>
          </div>
          <div class="user-info">
            <div>
              <div>Name: ${escapeHtml(user.name)}</div>
              <div style="font-size:13px; margin-top:6px;">Email: ${escapeHtml(user.email)}</div>
            </div>
            <div style="text-align:right;">
              <div>Invoice Date: ${today}</div>
              <div style="margin-top:6px;">Customer ID: ${escapeHtml(user._id?.toString() || "")}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr><th>Product</th><th>Qty</th><th>Rate</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${products.map(p => {
                const name = escapeHtml(p.productName);
                const qty = safeNum(p.productQty);
                const rate = safeNum(p.productRate);
                return `<tr>
                  <td style="text-align:left; padding-left:12px;">${name}</td>
                  <td>${qty}</td>
                  <td>₹ ${rate.toFixed(2)}</td>
                  <td>₹ ${(qty * rate).toFixed(2)}</td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>
          <div style="overflow:auto;">
            <div class="totals">
              <p>Sub Total: ₹ ${subTotal.toFixed(2)}</p>
              <p>GST (18%): ₹ ${(subTotal * gstRate).toFixed(2)}</p>
              <p class="amount">Total Amount: ₹ ${totalInclGst.toFixed(2)}</p>
            </div>
          </div>
          <div style="clear:both;"></div>
          <div class="footer">We are pleased to provide any further information you may require.</div>
        </div>
      </body>
      </html>
    `;

    // Launch browser
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true, margin: { top: "20mm", bottom: "20mm", left: "12mm", right: "12mm" } });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${userId}.pdf`,
    });
    return res.send(pdfBuffer);

  } catch (err: any) {
    console.error("[invoice] Error generating PDF:", err);
    return res.status(500).json({ success: false, message: err?.message ?? "Unknown error during invoice generation" });
  }
};

function escapeHtml(str: any) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


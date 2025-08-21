import { type Response } from "express";
import puppeteer from "puppeteer";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
export const generateInvoice = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).lean();
    const products = await Product.find({ userId }).lean();

    const subTotal = products.reduce(
      (acc, p) => acc + p.productQty * p.productRate,
      0
    );
    const totalInclGst = subTotal * 1.18;

    const html = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background: #fff;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
      }

      .header-left {
        font-weight: bold;
        font-size: 22px;
      }

      .header-right {
        text-align: right;
      }

      .invoice-title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0;
      }

      .user-info {
        background-color: #181717;
        color: white;
        padding: 20px 40px;
        border-radius: 12px;
        margin: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .user-info .name {
        font-size: 16px;
        font-weight: bold;
      }

      .user-info .email {
        font-size: 14px;
      }

      table {
        width: 90%;
        margin: 30px auto;
        border-collapse: collapse;
        font-size: 14px;
      }

      th {
        background: linear-gradient(90deg, #141e30, #243b55);
        color: white;
        padding: 10px;
        text-align: center;
      }

      td {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #eee;
      }

      tr:nth-child(even) {
        background: #f9f9f9;
      }

      .totals-box {
        width: 250px;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 15px;
        margin: 20px 40px 40px auto;
      }

      .totals-box p {
        margin: 8px 0;
        font-size: 14px;
      }

      .totals-box .amount {
        font-size: 18px;
        font-weight: bold;
        color: #0070f3;
      }

      .footer {
        background: #141e30;
        color: white;
        text-align: center;
        padding: 15px;
        font-size: 12px;
        border-radius: 20px;
        margin: 20px 40px;
      }

      .date {
        margin: 0 40px;
        font-size: 12px;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="header-left">Levitation Infotech</div>
      <div class="header-right">
        <div class="invoice-title">INVOICE GENERATOR</div>
        <div style="font-size: 12px; color: #666;">Sample Output should be this</div>
      </div>
    </div>

    <div class="user-info">
      <div>
        <div class="name">Name:${user?.name || "Person_name"}</div>
      </div>
      <div>
        <div class="email">${user?.email || "example@email.com"}</div>
        <div style="font-size: 12px; margin-top: 4px;">Date: ${new Date().toLocaleDateString()}</div>
      </div>
    </div>

    <table>
      <tr>
        <th>Product</th>
        <th>Qty</th>
        <th>Rate</th>
        <th>Total</th>
      </tr>
      ${products
        .map(
          (p) => `
        <tr>
          <td>${p.productName}</td>
          <td>${p.productQty}</td>
          <td>₹ ${p.productRate.toFixed(2)}</td>
          <td>₹ ${(p.productQty * p.productRate).toFixed(2)}</td>
        </tr>`
        )
        .join("")}
    </table>

    <div class="totals-box">
      <p>Total Charges: ₹ ${subTotal.toFixed(2)}</p>
      <p>GST (18%): ₹ ${(subTotal * 0.18).toFixed(2)}</p>
      <p class="amount">Total Amount: ₹ ${totalInclGst.toFixed(2)}</p>
    </div>

    <div class="date">Date: ${new Date().toLocaleDateString()}</div>

    <div class="footer">
      We are pleased to provide any further information you may require and look forward to assisting with
      your next order. Rest assured, it will receive our prompt and dedicated attention.
    </div>
  </body>
</html>
`;

    const browser = await puppeteer.launch({ headless: "new" as any });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate invoice" });
  }
};

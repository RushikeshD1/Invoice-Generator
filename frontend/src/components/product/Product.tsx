import { Button } from "../ui/button";
import iconplus from "../../assets/formkit_add.png";
import vectorup from "../../assets/Vector.png";
import { useEffect, useState } from "react";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";

type ProductItem = {
  _id?: string;
  productName: string;
  productQty: number;
  productRate: number;
  userId?: string;
};

const Product = () => {
  const reduxToken = useSelector((s: RootState) => (s as any).auth?.token) as
    | string
    | null
    | undefined;

  const [productName, setProductName] = useState<string>("");
  const [productQty, setProductQty] = useState<number | "">("");
  const [productRate, setProductRate] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalInclGst, setTotalInclGst] = useState<number>(0);

  const fetchProducts = async () => {
    const token =
      reduxToken ??
      (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    if (!token) return;

    try {
      const res = await axios.get(
        "https://invoice-generator-webc.onrender.com/api/v1/product/fetch",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        setProducts(res.data.products || []);
        setSubTotal(res.data.subTotal);
        setTotalInclGst(res.data.totalInclGst);
      }
    } catch (err: any) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const postProduct = async () => {
    // basic validation
    if (!productName.trim() || productQty === "" || productRate === "") {
      alert("Please fill all fields");
      return;
    }

    const qty = Number(productQty);
    const rate = Number(productRate);

    if (!Number.isFinite(qty) || !Number.isFinite(rate)) {
      alert("Quantity and Rate must be numbers");
      return;
    }

    const token =
      reduxToken ??
      (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    if (!token) {
      alert("You must be logged in to add a product");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://invoice-generator-webc.onrender.com/api/v1/product/create",
        {
          productName: productName.trim(),
          productQty: qty,
          productRate: rate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.success) {
        alert(res.data.message || "Product added successfully");
        setProductName("");
        setProductQty("");
        setProductRate("");
        fetchProducts();
      } else {
        alert(res.data?.message || "Failed to add product");
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      const res = await fetch("https://invoice-generator-webc.onrender.com/api/v1/invoice/generate", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(res);

      if (!res.ok) throw new Error("Failed to download invoice");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:px-4 px-10 ">
      {/* add product */}
      <div className="flex flex-col gap-1 md:w-96">
        <h1 className="text-2xl font-semibold">Add Products</h1>
        <span className="text-sm text-gray-300">
          This is basic login page which is used for levitation assignment
          purpose.
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {/* product data form */}
        <div className="flex flex-wrap md:flex-row flex-col justify-between md:gap-4 gap-4 md:p-0 p-5">
          <div className="flex flex-col gap-1">
            <label>Product Name</label>
            <input
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020] md:w-96"
              type="text"
              placeholder="Enter the product name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product Price</label>
            <input
              onChange={(e) =>
                setProductRate(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              value={productRate}
              type="number"
              placeholder="Enter the price"
              className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020] md:w-96"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Quantity</label>
            <input
              onChange={(e) =>
                setProductQty(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              value={productQty}
              type="number"
              placeholder="Enter the Qty"
              className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020] md:w-96"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center align-middle items-center">
          <Button
            className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451]"
            disabled={loading}
            onClick={postProduct}
          >
            {loading ? "Adding..." : "Add Product"}
            <img src={iconplus} alt="plus icon" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col text-black gap-4">
  {/* Table Container */}
  <div className="border border-gray-700 rounded-md">
    {/* Header (hidden on mobile) */}
    <div className="hidden md:block bg-[#FFFFFFE5] rounded-t-md p-4">
      <div className="grid grid-cols-4 text-sm font-semibold">
        <div className="px-4 flex gap-2 items-center justify-start">
          Product Name
          <img className="h-[16px]" src={vectorup} alt="up arrow" />
        </div>
        <div className="px-4 text-center">Price</div>
        <div className="px-4 flex gap-2 items-center justify-center">
          Quantity
          <img
            className="h-[16px] rotate-x-180"
            src={vectorup}
            alt="up arrow"
          />
        </div>
        <div className="px-4 text-center">Total Price</div>
      </div>
    </div>

    {/* Product Rows */}
    <div className="flex flex-col divide-y divide-gray-700">
      {products.length > 0 ? (
        products.map((p) => (
          <div
            key={p._id}
            className="border-b border-gray-700 px-4 py-2 text-white"
          >
            {/* Desktop/Table view */}
            <div className="hidden md:grid md:grid-cols-4">
              <div className="text-left">{p.productName}</div>
              <div className="text-center">₹ {p.productRate}</div>
              <div className="text-center">{p.productQty}</div>
              <div className="text-center">
                ₹ {p.productRate * p.productQty}
              </div>
            </div>

            {/* Mobile/Tablet view */}
            <div className="flex flex-col gap-1 md:hidden text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Product:</span>
                <span>{p.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Price:</span>
                <span>₹ {p.productRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Quantity:</span>
                <span>{p.productQty}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span>₹ {p.productRate * p.productQty}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-white text-center">No products found</div>
      )}
    </div>

    {/* Totals */}
    {products.length > 0 && (
      <div>
        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-4 px-4 py-2 font-semibold text-white">
          <div className="col-span-3">Sub-Total</div>
          <div className="text-right">₹ {subTotal.toFixed(2)}</div>
        </div>
        <div className="hidden md:grid md:grid-cols-4 px-4 py-2 font-semibold text-white">
          <div className="col-span-3">Incl. GST (18%)</div>
          <div className="text-right">₹ {totalInclGst.toFixed(2)}</div>
        </div>

        {/* Mobile view */}
        <div className="flex flex-col gap-1 px-4 py-2 font-semibold text-white md:hidden">
          <div className="flex justify-between">
            <span>Sub-Total</span>
            <span>₹ {subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Incl. GST (18%)</span>
            <span>₹ {totalInclGst.toFixed(2)}</span>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Button */}
  <div
    onClick={handleDownloadInvoice}
    className="flex justify-center align-middle items-center"
  >
    <Button className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451] w-80">
      Generate PDF Invoice
    </Button>
  </div>
</div>

    </div>
  );
};

export default Product;

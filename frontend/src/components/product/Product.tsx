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
        "http://localhost:3000/api/v1/product/fetch",
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
        "http://localhost:3000/api/v1/product/create",
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

  return (
    <div className="flex flex-col gap-4 md:px-0 px-10 ">
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
        <div className="flex md:flex-row flex-col justify-between md:gap-4 gap-4 ">
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
      <div className="flex flex-col w-full text-black gap-4">
        {/* table */}
        <div className="flex flex-col w-full border border-gray-700 rounded-tl-md rounded-tr-md">
          {/* Header */}
          <div className="bg-[#FFFFFFE5] rounded-tl-md rounded-tr-md p-4">
            <div className="grid grid-cols-4 text-sm font-semibold">
              <div className="px-4 flex gap-2 items-center justify-start">
                Product Name{" "}
                <img className="h-[16px]" src={vectorup} alt="up arrow" />
              </div>
              <div className="px-4 text-center">Price</div>
              <div className="px-4 flex gap-2 items-center justify-center">
                Quantity{" "}
                <img
                  className="h-[16px] rotate-x-180"
                  src={vectorup}
                  alt="up arrow"
                />
              </div>
              <div className="px-4 text-center">Total Price</div>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col divide-y divide-gray-700">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="grid grid-cols-4 px-4 py-2 text-white border-gray-700 border-b"
                >
                  <div className="text-left">{p.productName}</div>
                  <div className="text-center">₹ {p.productRate}</div>
                  <div className="text-center">{p.productQty}</div>
                  <div className="text-center">
                    ₹ {p.productRate * p.productQty}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-4 px-4 py-2 text-white">
                <div className="col-span-4 text-center">No products found</div>
              </div>
            )}
          </div>

          {products.length > 0 ? (
            <div>
              <div className="grid grid-cols-4 px-4 py-2 font-semibold text-white md:pr-32">
                <div className="col-span-3">Sub-Total</div>
                <div className="text-right">₹ {subTotal.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-4 px-4 py-2 font-semibold text-white md:pr-32">
                <div className="col-span-3">Incl. GST (18%)</div>
                <div className="text-right">₹ {totalInclGst.toFixed(2)}</div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-center align-middle items-center">
          <Button className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451] w-80">
            Generate PDF Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;

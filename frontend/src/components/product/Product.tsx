import { Button } from "../ui/button";
import iconplus from "../../assets/formkit_add.png"
import vectorup from "../../assets/Vector.png"
import arrowdown from "../../assets/jam_arrow-up.png"

const Product = () => {
  return (
    <div className="flex flex-col gap-4 md:px-0 px-10">
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
              className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020] md:w-96"
              type="text"
              placeholder="Enter the product name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Product Price</label>
            <input
              type="text"
              placeholder="Enter the price"
              className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020] md:w-96"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Quantity</label>
            <input
              type="text"
              placeholder="Enter the Qty"
              className="placeholder:text-sm px-2 py-2 outline-none border border-gray-700 rounded-sm bg-[#202020] md:w-96"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center align-middle items-center">
          <Button className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451]">
            Add Product
            <img src={iconplus} alt="plus icon" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full text-black gap-4">
        {/* table */}
        <div className="flex flex-col w-full border border-gray-700 rounded-tl-md rounded-tr-md">
          {/* Header */}
          <div className="bg-[#FFFFFFE5] rounded-tl-md rounded-tr-md p-4">
            <div className="flex flex-row w-full justify-between text-sm font-semibold">
              <div className="px-4 flex flex-row gap-3 justify-center align-middle">Product Name <img className="h-[16px] mt-[1px]" src={vectorup} alt="up arrow image" /></div>
              <div className="px-4">Price</div>
              <div className="px-4 flex flex-row gap-3 justify-center align-middle">Quantity <img className="h-[16px] mt-[1px] rotate-x-180" src={vectorup} alt="up arrow image" /></div>
              <div className="px-4">Total Price</div>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col divide-y divide-gray-700">
            <div className="flex flex-row w-full justify-between px-4 py-2">
              <div>Product Name - 1</div>
              <div>5</div>
              <div>10</div>
              <div>INR: 50</div>
            </div>
            <div className="flex flex-row w-full justify-between px-4 py-2">
              <div>Product Name - 2</div>
              <div>2</div>
              <div>10</div>
              <div>INR: 50</div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center align-middle items-center" >
          <Button className="bg-[#303030] hover:bg-[#303030] cursor-pointer text-[#bbf451] w-80">Generate PDF Invoice</Button>
        </div>
      </div>
    </div>
  );
};

export default Product;

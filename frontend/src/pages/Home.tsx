"use client";

import Product from "../components/product/Product";

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] md:px-16 justify-center align-middle items-center">
            <Product />
        </div>
    )
}

export default HomePage
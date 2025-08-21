import mongoose, { Document, Model, Schema } from "mongoose";
const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productQty: {
        type: Number,
        required: true
    },
    productRate: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
});
const Product = mongoose.model("Product", productSchema);
export default Product;
//# sourceMappingURL=product.model.js.map
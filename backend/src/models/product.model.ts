import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document{
  productName: string;
  productQty: number;
  productRate: number;
  userId: mongoose.Schema.Types.ObjectId;
}

const productSchema: Schema<IProduct> = new Schema({
    productName: {
        type : String,
        required : true
    },
    productQty: {
        type : Number,
        required : true
    },
    productRate: {
        type : Number,
        required : true
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  }
})

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);

export default Product;
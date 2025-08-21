import mongoose, { Document, Model } from "mongoose";
export interface IProduct extends Document {
    productName: string;
    productQty: number;
    productRate: number;
    userId: mongoose.Schema.Types.ObjectId;
}
declare const Product: Model<IProduct>;
export default Product;
//# sourceMappingURL=product.model.d.ts.map
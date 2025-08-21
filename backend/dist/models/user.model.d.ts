import { Document, Model } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=user.model.d.ts.map
import type { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    userId?: string;
}
export declare const postProduct: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export declare const fetchProduct: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export {};
//# sourceMappingURL=product.controller.d.ts.map
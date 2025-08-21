import type { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
    userId?: string;
}
export declare const auth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map
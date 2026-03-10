import { Request, Response, NextFunction } from "express";
import * as z from "zod";

const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      res.status(400).json({ success: false, errors });
      return;
    }
    req.body = result.data;
    next();
  };
};

export default validate;

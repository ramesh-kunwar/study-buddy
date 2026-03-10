import jwt, { SignOptions } from "jsonwebtoken";
import { CONFIG } from "../config";

export const generateToken = (id: string): string => {
  const options: SignOptions = {
    expiresIn: CONFIG.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign({ id }, CONFIG.JWT_SECRET as string, options);
};

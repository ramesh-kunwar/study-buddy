import { Request, Response } from "express";
import { RegisterInput } from "./auth.schema";
import { loginUserService, registerUserService } from "./auth.service";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body as RegisterInput;
    const { user, token } = await registerUserService({ name, email, password });
    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await loginUserService(req.body);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const logoutUserController = (_req: Request, res: Response): void => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(200).json({ message: "Logged out successfully" });
};

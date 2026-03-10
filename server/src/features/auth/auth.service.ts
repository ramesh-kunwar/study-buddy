import { generateToken } from "../../utils/utils";
import { RegisterInput, LoginInput } from "./auth.schema";
import UserModel from "./user.model";

export const registerUserService = async (input: RegisterInput) => {
  const { name, email, password } = input;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const user = new UserModel({ name, email, password });

  await user.save();

  const token = generateToken(user.id);

  user.password = undefined as any; // Hide password in response

  return { user, token };
};

export const loginUserService = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  user.password = undefined as any; // Hide password in response

  return { user, token };
};

import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  comparePassword: (userPassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;

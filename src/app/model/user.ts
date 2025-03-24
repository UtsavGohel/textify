import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  credits: number;
}

const UserSchema = new Schema<IUser>({
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
  },
  credits: {
    type: Number,
    required: true,
    default: 10, // Default to 10 credits, so user can test it out
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

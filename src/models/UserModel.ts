import UserInterface from "../interfaces/UserInterface";
import mongoose, { Schema } from "mongoose";
import userRoleEnum from "../interfaces/userRole";


const UserSchema: Schema<UserInterface & mongoose.Document> = new Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 20,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      min: 3,
      max: 20,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      min: 3,
      max: 40,
      trim: true,
      required: true,
      unique: [true, "Email already exists"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    role: {
      type: String,
      enum: Object.values(userRoleEnum),
      default: userRoleEnum.USER,
      required: true,
    },
 },
  { timestamps: true }
);

export default mongoose.model<UserInterface & mongoose.Document>(
  "User",
  UserSchema
);

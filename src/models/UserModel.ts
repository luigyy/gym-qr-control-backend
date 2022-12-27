import UserInterface from "../interfaces/UserInterface";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import userRoleEnum from "../interfaces/userRole";

const salt: number = 10;

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
    password: {
      type: String,
      min: 5,
      max: 40,
    },
  },
  { timestamps: true }
);

//hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const thisObj = this as UserInterface;
  try {
    thisObj.password = await bcrypt.hash(thisObj.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

//method has to be awaited when use
UserSchema.methods.comparePasswords = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

//do not spit password out when retrieving user
UserSchema.set("toJSON", {
  transform: function (_: any, ret: any) {
    delete ret["password"];
    return ret;
  },
});

export default mongoose.model<UserInterface & mongoose.Document>(
  "User",
  UserSchema
);

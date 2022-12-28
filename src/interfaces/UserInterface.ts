import userRoleEnum from "./userRole";
import mongoose from "mongoose";

export default interface UserInterface {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  lastName: string;
  email: string;
  password: string;
  membershipRenewalDates: Array<Date>; //everydate the customer has ever renew membership
  membershipLastRenewal: Date; //date of last renewal
  role: userRoleEnum;
  comparePasswords: (candidatePassword: string) => Promise<boolean>;
}

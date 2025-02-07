import mongoose from "mongoose";
import { IUser } from "../utils/types";

const userSchema = new mongoose.Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;

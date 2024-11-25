import mongoose from "mongoose";

type Role = "admin" |  "user";

interface IUser {
  username: string;
  name: string;
  role: Role;
  passwordHash: string;
}

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
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

interface ICoffee {
  name: string;
  price: number;
  description: string;
  category: string;
}

const coffeeSchema = new mongoose.Schema<ICoffee>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

coffeeSchema.set("toJSON", {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Coffee = mongoose.model<ICoffee>("Coffee", coffeeSchema);

export default Coffee;

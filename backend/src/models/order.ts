import mongoose from "mongoose";
import { IOrder } from "../utils/types";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Coffee",
      required: true,
      validate: {
        validator: async function (items: mongoose.Types.ObjectId[]) {
          const Coffee = mongoose.model("Coffee");
          for (const item of items) {
            const coffeeExists = await Coffee.exists({ _id: item });
            if (!coffeeExists) {
              return false;
            }
          }
          return true;
        },
        message:
          "One or more items do not exist in the current Coffee collection",
      },
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Preparing", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { versionKey: false, timestamps: true }
);

orderSchema.set("toJSON", {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;

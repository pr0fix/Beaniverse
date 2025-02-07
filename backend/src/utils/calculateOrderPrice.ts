import Coffee from "../models/coffee";

const calculateTotalPrice = async (items: string[]) => {
  let totalPrice = 0;
  for (const itemId of items) {
    const coffee = await Coffee.findById(itemId);
    if (coffee) {
      totalPrice += coffee.price;
    } else {
      throw new Error(`Coffee item with id ${itemId} not found`);
    }
  }
  return totalPrice;
};

export default calculateTotalPrice;

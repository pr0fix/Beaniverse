import Coffee from "../models/coffee";

const getAllCoffees = async () => {
  try {
    const coffees = await Coffee.find({});
    return coffees;
  } catch (error) {
    console.error("Error fetching coffee items:", error);
    throw new Error("Error fetching coffee items");
  }
};

const getCoffeeById = async (id: string) => {
  try {
    const coffee = await Coffee.findById(id);
    if (!coffee) {
      throw new Error("Coffee not found");
    }
    return coffee;
  } catch (error) {
    console.error(`Error fetching coffee with id {${id}}: `, error);
    throw new Error("Error fetching coffee");
  }
};

const addCoffee = async (
  name: string,
  price: number,
  description: string,
  category: string
) => {
  const coffee = new Coffee({ name, price, description, category });
  try {
    const savedCoffee = await coffee.save();
    return savedCoffee;
  } catch (error) {
    console.error("Error adding coffee item:", error);
    throw new Error("Error adding coffee item");
  }
};

export default { getAllCoffees, getCoffeeById, addCoffee };

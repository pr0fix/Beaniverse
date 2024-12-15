import User from "../models/user";

const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Error fetching users.");
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw new Error("Error fetching coffee");
  }
};

export default {
  getAllUsers,
  getUserById,
};

import User from "../models/user";
import { IUser } from "../utils/types";

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
    throw new Error("Error fetching user");
  }
};

const editUser = async (
  id: string,
  userData: Partial<IUser>
): Promise<IUser> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw new Error("Error updating user");
  }
};

const deleteUser = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw new Error("Error deleting user");
  }
};

export default {
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
};

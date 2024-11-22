import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";

const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return { error: "Invalid username or password" };
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET as string, {
      expiresIn: 60 * 60,
    });

    return { token, username: user.username, name: user.name };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error" };
  }
};

export default { login };

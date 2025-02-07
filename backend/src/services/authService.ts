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

    return { token, username: user.username, name: user.name, role: user.role };
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Error during login");
  }
};

const signup = async (
  role: string,
  username: string,
  name: string,
  password: string
) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    role,
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    if (savedUser !== null) {
      const loginResult = await login(username, password);
      if (loginResult.error) {
        throw new Error(loginResult.error);
      }
      return loginResult;
    } else {
      throw new Error("An error occurred while saving the user");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error("An error occurred while saving the user");
  }
};

export default { login, signup };

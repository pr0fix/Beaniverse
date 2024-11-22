  import bcrypt from "bcrypt";
  import User from "../models/user";
  import loginService from "./loginService";

  const signup = async (username: string, name: string, password: string) => {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    try {
      const savedUser = await user.save();
      if (savedUser !== null) {
        const loginResult = await loginService.login(username, password);
        if (loginResult.error) {
          throw new Error(loginResult.error);
        }
        return loginResult;
      } else {
        throw new Error("An error occurred while saving the user");
      }
    } catch (error) {
      throw new Error("An error occurred while saving the user");
    }
  };

  export default { signup };

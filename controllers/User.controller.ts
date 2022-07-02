import User from "../models/users.models";
import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

const generateAccessToken = (id: string) => {
  const payload = {id};
  return sign(payload, "secret", { expiresIn: "24h" });
};

class UserController {
  findAll = async (req: any, res: any): Promise<void> => {
    try {
      const doc = await User.find({});
      return res.json(doc);
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        message: "User not found",
      });
    }
  };

  find = async (req: any, res: any): Promise<void> => {
    try {
      const id: string = req.params.id;
      const doc = await User.findById(id);
      return res.json(doc);
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        message: "User not found",
      });
    }
  };

  delete = async (req: any, res: any): Promise<void> => {
    try {
      const id: string = req.params.id;
      const doc = await User.findOneAndRemove({ _id: id });
      return res.json({
        message: `User ${doc.fullname} deleted`,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        message: "Error - deleted user",
      });
    }
  };

  login = async (req: any, res: any): Promise<void> => {
    try {
      const { password, email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${email} не найден` });
      }

      const validPassword = compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }

      const token = generateAccessToken(user._id);
      return res.json({ user, token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "Error - login user",
      });
    }
  };

  create = async (req: any, res: any): Promise<void> => {
    try {
      const password = req.body.password;
      const hashPassword = hashSync(password, 7);
      const postData: { email: string; fullname: string; password: string } = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: hashPassword,
      };

      const user = new User(postData);
      const doc = await user.save();
      return res.json(doc);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error - created user",
      });
    }
  };
}

export default UserController;

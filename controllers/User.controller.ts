import User from "../models/users.models";

class UserController {
  find = async (req: any, res: any): Promise<void> => {
    try {
      const id: string = req.params.id;
      const doc = await User.findById(id);
      res.json(doc);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "User not found",
      });
    }
  };

  delete = async (req: any, res: any): Promise<void> => {
    try {
      const id: string = req.params.id;
      const doc = await User.findOneAndRemove({ _id: id });
      res.json({
        message: `User ${doc.fullname} deleted`,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "Error - deleted user",
      });
    }
  };

  create = async (req: any, res: any): Promise<void> => {
    try {
      const postData: { email: string; fullname: string; password: string } = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password,
      };

      const user = new User(postData);
      const doc = await user.save();
      res.json(doc);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error - created user",
      });
    }
  };
}

export default UserController;

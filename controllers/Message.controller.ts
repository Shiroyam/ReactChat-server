import DialogModel from "../models/dialog.models";
import Message from "../models/message.models";

class MessageController {
  find = (req: any, res: any): void => {
    const dialogId = req.params.id;

    Message.find({ dialog: dialogId })
      .populate(["dialog", "user"])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: "Messages not found",
          });
        }
        res.json(messages);
      });
  };

  create = async (req: any, res: any): Promise<void> => {
    try {
      const userId = req.body._id;

      const postData = {
        text: req.body.text,
        dialog: req.body.dialog_id,
        user: userId,
      };

      const message = new Message(postData);
      await message.save();

      await DialogModel.findOneAndUpdate(
        { _id: postData.dialog },
        { lastMessage: message._id }
      );

      res.json(message);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "error",
      });
    }
  };

  delete = async (req: any, res: any): Promise<void> => {
    try {
      const id = req.params.id;
      await Message.findByIdAndRemove(id);
      res.json({
        message: "message remove",
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "error",
      });
    }
  };
}

export default MessageController;

import DialogModel from "../models/dialog.models";
import Message from "../models/message.models";

class DialogController {
  find = (req: any, res: any): void => {
    const userId = req.body._id;

    DialogModel.find()
      .or([{ author: userId }, { partner: userId }])
      .populate(["author", "partner"])
      .populate({
        path: "lastMessage",
        populate: {
          path: "user",
        },
      })
      .exec(function (err, dialogs) {
        if (err) {
          return res.status(404).json({
            message: "Dialogs not found",
          });
        }
        return res.json(dialogs);
      });
  };

  create = async (req: any, res: any): Promise<void> => {
    try {
      const postData = {
        author: req.body._id,
        partner: req.body.partner,
      };

      const findDialog = await DialogModel.findOne({
        author: req.body._id,
        partner: req.body.partner,
      });

      if (findDialog) {
        return res.status(403).json({
          status: "error",
          message: "Такой диалог уже есть",
        });
      }

      const dialog = new DialogModel(postData);

      await dialog.save();

      const message = new Message({
        text: req.body.text,
        author: req.body._id,
        dialog: dialog._id,
      });

      const doc = await message.save();
      res.json(doc);
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

      const dialog = await DialogModel.findByIdAndRemove({ _id: id });

      if (dialog) {
        res.json({
          message: `Dialog deleted`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "error",
      });
    }
  };
}

export default DialogController;

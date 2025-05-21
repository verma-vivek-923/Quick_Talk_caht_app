import { Messages, Conversions } from "../models/message.model.js";
import { getRecieSocId, io } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciever_id } = req.params;
    const { id: sender_id } = req.users;

    let find_conver = await Conversions.findOne({
      //find for precreated conversion, we dont need to create conveersion for each meassage
      members: { $all: [sender_id, reciever_id] },
    });

    if (!find_conver) {
      find_conver = await Conversions.create({
        // create conversion if now already
        members: [sender_id, reciever_id],
      });
    }

    const new_message = new Messages({
      message,
      sender_id,
      reciever_id,
    });

    // console.log(new_message);
    // console.log(find_conver);

    if (new_message) {
      find_conver.messages.push(new_message._id);
    }

    console.log(new_message);
    console.log(find_conver);
    // await new_message.save();
    // await find_conver.save();

    await Promise.all([find_conver.save(), new_message.save()]); //save both as one promise

    const rec_Soc_Id = getRecieSocId(reciever_id);

    if (rec_Soc_Id) {
      io.to(rec_Soc_Id).emit("new_msg", new_message);
    }

    //   console.log(new_message)
    return res
      .status(200)
      .json({ message: "Message Sended Successfully", new_message });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error", error });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { id: reciever_id } = req.params;
    const sender_id = req.users.id;

console.log(sender_id)
console.log(reciever_id)


    let conversion = await Conversions.findOne({
      members: {$all:[sender_id, reciever_id]}   ,
    }).populate("messages");

    // console.log(conversion)
    // console.log(sender_id)
    // console.log(typeof sender_id)

    if (!conversion) {
      return res.status(200).json([]);
    }

    return res.status(200).json({ conversion });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

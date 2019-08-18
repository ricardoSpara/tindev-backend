import Dev from "../models/Dev";

class LikeController {
  async store(req, res) {
    console.log(req.socket, req.connectedUsers);
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];

      if (loggedSocket) {
        req.socket.to(loggedSocket).emit("match", targetDev);
      }

      if (targetSocket) {
        req.socket.to(targetSocket).emit("match", loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    res.json(loggedDev);
  }
}

export default new LikeController();

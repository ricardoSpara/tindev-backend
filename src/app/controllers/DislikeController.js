import Dev from "../models/Dev";

class DislikeController {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    res.json(loggedDev);
  }
}

export default new DislikeController();

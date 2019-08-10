import axios from "axios";
import Dev from "../models/Dev";

class DevController {
  async store(req, res) {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    if (!response.data) {
      res.json({ success: false, msg: "User not found" });
    }

    let { login, name, bio, avatar_url: avatar } = response.data;

    name = name ? name : "Lindo";
    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });

    return res.json(dev);
  }
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        {
          _id: { $ne: user }
        },
        {
          _id: { $nin: loggedDev.likes }
        },
        {
          _id: { $nin: loggedDev.dislikes }
        }
      ]
    });

    return res.json(users);
  }
}

export default new DevController();

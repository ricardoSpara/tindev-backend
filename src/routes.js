import { Router } from "express";
import DevController from "./app/controllers/DevController";
import LikeController from "./app/controllers/LikeController";
import DislikeController from "./app/controllers/DislikeController";

const routes = new Router();

routes.get("/", (req, res) => {
  res.json({ success: true });
});

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);

routes.post("/devs/:devId/likes", LikeController.store);
routes.post("/devs/:devId/dislikes", DislikeController.store);

export default routes;

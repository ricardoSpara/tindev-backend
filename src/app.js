import express from "express";
import routes from "./routes";
import cors from "cors";
import http from "http";
import io from "socket.io";

import "./database";

const connectedUsers = {};

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.socket = io(this.server);

    this.middlewares();
    this.routes();

    this.socket.on("connection", socket => {
      const { user } = socket.handshake.query;

      connectedUsers[user] = socket.id;
    });
  }

  middlewares() {
    this.app.use((req, res, next) => {
      req.socket = this.socket;
      req.connectedUsers = connectedUsers;
      return next();
    });

    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;

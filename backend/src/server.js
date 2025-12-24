import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { env } from "./config/env.js";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN, credentials: true },
});

io.on("connection", (socket) => {
  // plus tard: auth socket + join room user:<id>
  // socket.on("join", ({ userId }) => socket.join(`user:${userId}`));
});

server.listen(env.PORT, () => {
  console.log(` API running on http://localhost:${env.PORT}`);
});

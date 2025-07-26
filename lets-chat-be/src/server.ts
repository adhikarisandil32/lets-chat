import { app } from "./app.js";
import http from "http";
import { config } from "./config/config.js";
import { Server } from "socket.io";
import chalk from "chalk";

const server = http.createServer(app);

const PORT = +config.PORT;
const NETWORK_ADDRESS = config.NETWORK_ADDRESS;

const io = new Server(server, {
  cors: {
    origin: config.ALLOWED_CORS_ORIGINS ?? false,
  },
});

const updateUserCount = () => {
  const count = io.engine.clientsCount;

  io.emit("client-count", count);
};

io.on("connection", (socket) => {
  console.log(`Socket connection successful with id: ${socket.id}`);
  updateUserCount();

  // socket.on("message", (message) => {
  //   socket.emit("message", message);
  // });
  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("connect", updateUserCount);
  socket.on("disconnect", updateUserCount);
});

server.listen(PORT, NETWORK_ADDRESS, () => {
  console.log(
    `
${chalk.green.bold("Express Server")} ready at
${chalk.bold("-→")} ${chalk.bold("Local: ")} ${chalk.blue(`http://localhost:${PORT}`)}
${NETWORK_ADDRESS ? `${chalk.bold("-→")} ${chalk.bold("Network: ")} http://${NETWORK_ADDRESS}:${PORT}` : ``}
    `,
  );
});

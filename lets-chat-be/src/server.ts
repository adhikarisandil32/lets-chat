import { app } from "./app.js";
import http from "http";
import { config } from "./config/config.js";
import { Server } from "socket.io";
import chalk from "chalk";
import { getNetworkIps } from "./utils/get-network-ips.js";

const server = http.createServer(app);

const PORT = +config.PORT;
const NETWORK_ADDRESSES = getNetworkIps();

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

server.listen(PORT, () => {
  console.log(
    `
${chalk.green.bold("Express Server")} ready at
${chalk.green.bold.green("-→")} ${chalk.bold("Local: ")}   ${chalk.blue(`http://localhost:${PORT}`)}
${NETWORK_ADDRESSES && NETWORK_ADDRESSES.length > 0 ? NETWORK_ADDRESSES.map((address) => `${chalk.bold.green("-→")} ${chalk.bold("Network: ")} ${chalk.blue(`http://${address}:${PORT}`)}`).join("\n") : ""}
    `,
  );
});

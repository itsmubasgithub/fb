const express = require("express");
const userRouter = require("./Router/userRouter");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/connect");
const cors = require("cors");
const postRouter = require("./Router/postRouter");
const reqRouter = require("./Router/requestRouter");

const app = express();
app.use(cors());

require("dotenv").config();

require("colors");
const http = require("http");
// get the socket server
const { Server } = require("socket.io");
const payRouter = require("./Router/paymentRouter");
// make your own server
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

// make socket server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["PUT", "GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected on host ${socket.id.blue} `);

  socket.on("add_friend", (data) => {
    socket.broadcast.emit("show_request", data);
  });

  socket.on("sent_message", (data) => {
    console.log(data);
    socket.broadcast.emit("recieved_message", data);
  });

  socket.on("incoming-video", (data) => {
    socket.broadcast.emit("show-video-data", data);
    console.log(data);
  });

  socket.on("reject-call", (data) => {
    socket.broadcast.emit("call-rejected", data);
  });
});

app.use("/user/api/", userRouter);
app.use("/api/posts/", postRouter);
app.use("/add-requests", reqRouter);
app.use("/api/payment/", payRouter);

app.use(errorHandler);

server.listen(process.env.PORT, () =>
  console.log(`Data will be connected: ${process.env.PORT.red}`)
);

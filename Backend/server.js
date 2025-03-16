const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/smart-ration-db")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error", err);
  });

const userRouter = require("./routes/user");
const rfidRouter = require("./routes/rfid");

app.use("/user", userRouter);
app.use("/rfid", rfidRouter);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

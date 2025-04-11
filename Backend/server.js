const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const { connectDb } = require("./config/db");
const userRouter = require("./routes/user");
const rfidRouter = require("./routes/rfid");
const truckRoutes = require("./routes/truckRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.io = io;
  next();
});

connectDb()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error", err);
  });

app.use("/user", userRouter);
app.use("/rfid", rfidRouter);
app.use("/api/truck", truckRoutes);

app.use(errorMiddleware);

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

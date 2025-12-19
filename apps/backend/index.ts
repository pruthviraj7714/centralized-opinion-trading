import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Healthy Server",
  });
});

app.use("/api/v1/user", userRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

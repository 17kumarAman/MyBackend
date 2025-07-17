import express from "express";
const app = express();
import cors from "cors";
import userRouter from "./router/userRouter.js";
import payrollRouter from "./router/payrollRouter.js";
import openActivity from "./router/openActivity.js"
import hrRouter from "./router/hrRouter.js";
import activityRouter from "./router/activityRouter.js";
import leaveRouter from "./router/leaveRouter.js";
import totalLeaveRouter from "./router/totaLeaveRouter.js";
import adminRouter from "./router/adminRouter.js";
import verifyRouter from "./router/verifyRouter.js";
import projectRouter from "./router/projectRouter.js";
import holidayRouter from "./router/holidayRouter.js";
import taskRouter from "./router/taskRouter.js";
import chatRouter from "./router/chatRouter.js";
import notification from "./router/notification.js"
import clock from "./router/clockRouter.js"
import award from "./router/awardRouter.js"
import lead from "./router/leadRouter.js"
import ProjectRoute from "./router/ProjectRoutes.js"
import samayRoute from "./router/samayRouter.js"

import attendanceRouter from "./router/attendanceRouter.js";
import authRouter from "./router/authRouter.js";
import systemRouter from "./router/systemRouter.js";
// import apprisalRouter from "./router/apprisalRouter.js"
// import indicatorRouter from "./router/indicatorRouter.js";
import { connectDb } from "./db/user_conn.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
// import TestClockRouter from "./router/TestClockRouter.js"

import cron from 'node-cron';

import dotenv from "dotenv";
import User from "./models/User/User.js";
import ActivityTracker from "./models/ActivityTracker/ActivityTracker.js";
import payslip from "./router/paySlipRouter.js";
import PermissionRouter from "./router/PermissionRouter.js";
// import Trainer from "./models/Trainer/Trainer.js";
import errorHandler from "./middleware/errorHandler.js";
import { uploadToCloudinary } from "./utils/cloudinary.js";


dotenv.config();
const port = process.env.PORT;

//Database Connection
connectDb();

// app.use(
//   cors({
//     origin: process.env.ORIGIN_URL,
//     credentials: true,
//     methods: ["get", "post", "delete", "put"],
//   })
// );
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
  })
)


app.use("/user", userRouter);
app.use("/hr", hrRouter);
app.use("/activity", activityRouter);
app.use("/leave", leaveRouter);
app.use("/totalLeave", totalLeaveRouter);
app.use("/admin", adminRouter);
app.use("/verify", verifyRouter);
app.use("/project", projectRouter);
app.use("/holiday", holidayRouter);
app.use("/task", taskRouter);
app.use("/chat", chatRouter);
app.use("/notification", notification);
app.use("/clock", clock);
app.use("/award", award);
app.use("/lead", lead);
app.use("/payroll", payrollRouter);
app.use("/openActivity", openActivity);

app.use("/attendance", attendanceRouter);
app.use("/auth", authRouter);
app.use("/system", systemRouter);
app.use("/payslip", payslip);

app.use("/permission", PermissionRouter);

app.use("/latest_project", ProjectRoute)
app.use("/samay", samayRoute);

app.post("/uploadfile", async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = req.files.image;

    console.log("Temp file path:", image.tempFilePath);

    // Directly use the temp file path
    const result = await uploadToCloudinary(image.tempFilePath);

    console.log("Cloudinary upload result:", result);

    return res.status(200).json({
      message: "Uploaded successfully",
      url: result.secure_url,
      imagePath:image.tempFilePath
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


const task = cron.schedule('55 23 * * *', async () => {

  let users = await User.find({ role: { $ne: "ADMIN" } });
  let todayDate = new Date().toLocaleDateString('en-GB');
  let todayAttendances = await ActivityTracker.find({ date1: todayDate }, { 'user._id': 1, _id: 0 });

  let arr = [];
  for (let i of todayAttendances) {
    if (!arr.includes(i.user._id)) {
      arr.push(i.user._id);
    }
  }
  let absentUsers = users.filter(x => !arr.includes(x._id));

  let arr1 = [];
  let date = new Date().getTime();
  for (let i of absentUsers) {
    arr1.push({
      user: i, date, date1: todayDate, clockIn: 0, clockOut: 0, late: 0, overtime: 0, total: 0, message: ''
    });
  }
  await ActivityTracker.insertMany(arr1, { ordered: false });
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata'
});

task.start();

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(errorHandler)

app.listen(port, () => {
  console.log("Listening on ", port);
});


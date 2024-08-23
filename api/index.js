import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import multer from "multer";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "/public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/images"));
  },
  filename: (req, file, cb) => {
    if (!req.body.name) {
      return cb(new Error("No filename provided"), null);
    }
    const fileName = req.body.name || `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    return res.status(200).json("File Uploaded Successfully");
  } catch (error) {
    console.log(err);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

//test
// app.get("/",(req,res)=>{
//     res.send("Welcome to Home Page");
// })
// app.get("/users",(req,res)=>{
//     res.send("Welcome to User Page");
// })

app.listen(process.env.PORT || 8800, () => {
  console.log(`Backend sever is running on ${process.env.PORT}`);
});

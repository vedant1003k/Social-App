import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/post.js';

const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

//middleware 
app.use(express.json());
app.use(helmet()); 
app.use(morgan("common"));


app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);

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

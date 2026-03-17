import "./config/env.js";
import app from "./app.js";
import mongoose from "mongoose";


const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.MONGODB_URI)
.then(() => {

  console.log("mongo connected");

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });

})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

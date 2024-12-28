const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user")
const { courseRouter} = require("./routes/course")
const { adminRouter } = require("./routes/admin")
//Routing in express, the express Router
const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", courseRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect("mongodb+srv://Biplab:QkoxQfk10KLODqtV@cluster0.reix0.mongodb.net/course-app");
  app.listen(3000); 
  console.log("listninig on port 3000");
  
}

main()


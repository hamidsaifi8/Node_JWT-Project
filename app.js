const express = require("express");
const app = express();

const mainRoutes = require("./routes/main");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(express.json()); //middleware for parsing JSON data
//middleware for static files
app.use(express.static("./public"));

app.use("/api/v1", mainRoutes);
//middleware for handling errors
app.use(errorHandlerMiddleware);

app.listen(5000, () => console.log("Server is running on port 5000"));

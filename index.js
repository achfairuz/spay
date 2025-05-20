const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
const userRoutes = require("./routes/userRoutes");
const rekeningRoutes = require("./routes/rekeningRoutes");
const transferRoutes = require("./routes/transferRoutes");
const api_keyRoutes = require("./routes/api_keyRoutes");

// routes
app.use("/api/users", userRoutes);
app.use("/api/users", rekeningRoutes);
app.use("/api/users", transferRoutes);
app.use("/api/users", api_keyRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

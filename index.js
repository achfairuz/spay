const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
const rekeningRoutes = require("./routes/rekeningRoutes");
const transferRoutes = require("./routes/transferRoutes");
const api_keyRoutes = require("./routes/api_keyRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/users", rekeningRoutes);
app.use("/api/users", transferRoutes);
app.use("/api/users", api_keyRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

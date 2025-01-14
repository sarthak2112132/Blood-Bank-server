const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoute");
const inventoryRoutes = require("./routes/inventoryRoutes");
const analyticsRoutes = require("./routes/analyticsRoute");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use(express.static(path.join(__dirname, "./client/build")));
connectDb();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at the ${PORT} port `.white.bgCyan);
});

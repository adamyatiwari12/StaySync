const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const roomRoutes = require("./routes/room.routes");
const userRoutes = require("./routes/user.routes");
const complaintRoutes = require("./routes/complaint.routes");
const paymentRoutes = require("./routes/payment.routes");
const bootstrapRoutes = require("./routes/bootstrap.routes");


const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://stay-sync-phi.vercel.app"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms",roomRoutes);
app.use("/api/users", userRoutes);
app.use("/api/complaints",complaintRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/bootstrap", bootstrapRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

module.exports = app;
const express = require('express');
const app = express();
require("dotenv").config();
const path = require('path');
const cors = require("cors");
const sequelize = require("./model/db-connection");
require("./createTables/UsersTable")
require("./createTables/expenseTable")
require("./createTables/assosiactions")
require("./createTables/orders");
require("./services/emailService");
const expenseRoutes = require("./routes/expenseRoute");
const paymentRoutes = require("./routes/paymentRoutes");

const userRoute = require("./routes/userRoutes")
const signInRoute = require("./routes/signInRoute")
const leadBoardRoutes = require("./routes/leadBoardRoute");

app.use(cors({
    origin: "http://localhost:5173"
}))
app.get('/',(req,res)=>{
    res.send("This is home page")
})
app.use(express.json());
app.use(express.static(
    path.join(__dirname, "../frontend/dist")
));
app.use(express.json());
app.use("/expenses",userRoute);
app.use("/expenses",signInRoute);
app.use("/expenses", expenseRoutes);
app.use("/expenses/payments", paymentRoutes);
app.use("/expenses", leadBoardRoutes);

// React Router fallback last
app.get("/{*splat}", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html")
    );
});


sequelize.sync().then(()=>{
app.listen(3000,()=>{
    console.log("Server is running on localhost:3000")
})
})
 .catch((err)=>{
   console.log(err);
 })
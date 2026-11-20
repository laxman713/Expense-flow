const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
const sequelize = require("./model/db-connection");
require("./createTables/UsersTable")
const userRoute = require("./routes/userRoutes")
const signInRoute = require("./routes/signInRoute")

app.use(cors({
    origin: "http://localhost:5173"
}))
app.get('/',(req,res)=>{
    res.send("This is home page")
})
app.use(express.static(
    path.join(__dirname, "../frontend/dist")
));
app.use(express.json());
app.use("/expenses",userRoute);
app.use("/expenses",signInRoute);


// React Router fallback last
app.get("/{*splat}", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html")
    );
});


sequelize.sync({alter:true}).then(()=>{
app.listen(3000,()=>{
    console.log("Server is running on localhost:3000")
})
})
 .catch((err)=>{
   console.log(err);
 })
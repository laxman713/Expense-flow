const {Sequelize}= require('sequelize');

const sequelize = new Sequelize('expenseFlow','root','Laxmanaliasbunny*525',{
   host: "localhost",
   dialect: "mysql"
});

(async ()=>{try{
 await sequelize.authenticate();
 console.log("connection established");
}catch(err){
    console.log(err)
}})();

module.exports = sequelize;
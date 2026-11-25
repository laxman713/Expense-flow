const { userTable } = require( "../createTables/assosiactions");

const getPremiumStatus = async(userId)=>{
    try{

        const user = await userTable.findByPk(userId);
        return user.isPremium;

    }catch(err){
        console.log(err);
    }
}

module.exports = getPremiumStatus
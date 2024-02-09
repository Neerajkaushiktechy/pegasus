const User = require("../database/models/user");

exports.getUser = async (req,res)=>{
    try {
       let data;
       if(req.params.id){
           data = await User.findById(req.params.id)
       }else{
           data = await User.find();
       }
       if(!data){return res.status(400).json({success: true,message:"User not found"})}
       return res.status(200).json({success: true,message:"User found",data});
   } catch (error) {
       return res.status(400).json({success: false,message:"There is some error please try again later" });
   }
}
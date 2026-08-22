const foodPartnerModel=require("../models/foodpartner")
const userModel=require("../models/user")
const jwt=require("jsonwebtoken");


async function authFoodPartnerMiddleware(req,res,next){
      const token=req.cookies.token;
      if(!token){
        return res.status(401).json({
            message:"please login first"
         })
      }
      try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({
                message: "Unauthorized: Food partner account not found. Please login as a food partner."
            });
        }

        req.foodPartner = foodPartner;

        next();

      } catch(err){
         return res.status(401).json({
            message:"invalid token"
         })
      }
}

async function authUserMiddleware(req,res,next){
      const token=req.cookies.token;
      if(!token){
        return res.status(401).json({
            message:"please login first"
         })
      }
      try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized: User account not found. Please login as a user."
            });
        }

        req.user = user;

        next();

      } catch(err){
         return res.status(401).json({
            message:"invalid token"
         })
      }
}


module.exports={
    authFoodPartnerMiddleware,
    authUserMiddleware
}
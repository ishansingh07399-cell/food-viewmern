// create server
const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRoutes=require("./routes/auth");
const foodRoutes=require("./routes/food");
const foodPartnerRoutes=require("./routes/food-partner");


const app=express();

// CORS — allow frontend to communicate with backend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,               // allow cookies/withCredentials
}));

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.use('/api/auth',authRoutes); 
app.use("/api/food",foodRoutes);
app.use("/api/food-partner",foodPartnerRoutes);

module.exports=app;
// create server
const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRoutes=require("./routes/auth");
const foodRoutes=require("./routes/food");
const foodPartnerRoutes=require("./routes/food-partner");


const app=express();

// CORS — allow frontend to communicate with backend
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://food-viewmern.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        return callback(null, true);
    },
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
import express from "express";
import mongoose from "mongoose";
import AuthRoute from "./routes/AuthRoute.js";
import cors from "cors";
import CartModel from "./models/CartModel.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(AuthRoute)

app.post("/cart",async (req,res) => {
    const {name,price,quantity,userId} = req.body;
    const cartItem = await CartModel.create({name,price,quantity,userId});
    if(cartItem){
        res.status(201).json(cartItem);
    }else{
        res.status(400).json(cartItem)
    }
});

app.get("/cart/:userId",async (req, res) => {
    const {userId} = req.params;
    console.log(userId);
    const cartItems = await CartModel.find({userId});
    res.status(200).json(cartItems);
})


mongoose.connect("mongodb://localhost:27017/PlantHouse").then(() => {
    console.log("then")
    app.listen(3000,()=>{
        console.log("Server started at " + 3000)
    });
}).catch(e => console.log(e.message));
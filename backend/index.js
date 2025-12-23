import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';

import User from './models/user.model.js';
import bcrypt from "bcrypt";
import crypto from "crypto";


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/chat_application")
.then(()=>console.log("db connected"))
.catch((err)=>console.log("err"));

app.get("/",(req,res)=>{
  res.send("hello abhishek");
});

app.get("/verify-email",async(req,res)=>{
  try{
    const {token} = req.query;
    const user = await User.findOne({verificationToken:token});
    if(!user)
      return res.status(400).json({message:"Invalid or expired token"});
    
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({message: "Email verified successfully"});
  }
  catch(error){
    res.status(500).json({message:"server error"});
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(403).json({ message: "Please verify your email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful" });
});


app.post("/signup", async(req,res)=>{
  
  try{
    const {name,email,password} = req.body;

    const existingUser = await User.findOne({email:email});
    if(existingUser){
    return  res.status(400).json({message:"Email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const token = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
    });
    res.status(201).json({
      message: "Signup successful. Please verify your email",
    });
  }
  catch(err){
res.status(500).json({message:"Server error"});
  }

});




app.listen(3000,()=>console.log("http://localhost:3000"));
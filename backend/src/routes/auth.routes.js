import express from "express";
import User from '../models/user.model.js';
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router();

router.get("/verify-email",async(req,res)=>{
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(403).json({ message: "Please verify your email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful",name: user.name });
});

router.post("/signup", async(req,res)=>{
  
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

    //send verification link on user email thorugh nodemailer
    //Step 1: Create Transporter

    const transporter = nodemailer.createTransport({
      service: "gmail",
        auth:{
          user: "abhinvishal5@gmail.com",
          pass: process.env.GMAIL_APP_PASSWORD,
      }
    });

    //send mail in signup route
    const verifyLink = `http://localhost:3000/verify-email?token=${token}`;
    await transporter.sendMail({
      from: "Chat App by Abhishek Anand",
      to: email,
      subject: "Verify your email",
      html:`<h3>Verify your email</h3>
    <p>Click the link below:</p>
    <a href="${verifyLink}">Verify Email</a>
  `
});
    

    res.status(201).json({
      message: "Signup successful. Please verify your email",
    });
  }
  catch(err){
res.status(500).json({message:"Server error"});
  }

});


export default router;
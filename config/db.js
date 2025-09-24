import mongoose from "mongoose";

export const connectDB=async() =>{
    await mongoose.connect('mongodb+srv://greateStack:24067788@cluster0.vwo0yjo.mongodb.net/Foodelivery').then(()=>console.log("DB Connected"))
}
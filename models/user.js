
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/yourDatabase")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true }
});

export const User = mongoose.model("User", userSchema);

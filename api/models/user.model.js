import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true, 
        validate: {
            validator: function(value) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: 'Please enter a valid email address'
    }},
    password:{
        type:String,
        required:true
    },
    transactions:[{ type: mongoose.Schema.Types.ObjectId, ref: "Transactions" }]
},{timestamps:true});

const User= mongoose.model('User',userSchema);

export default User;


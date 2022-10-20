const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    last: {
        type:String,
        required:true
    },
    email:  {
        type:String,
        required:true,
        unique:true
    },
    age:  {
        type:Number,
        required:true
    },
    mobile:  {
        type:Number,
        required:true
    },
    city:  {
        type:String,
        required:true
    },
    state:  {
        type:String,
        required:true
    },
    zip:  {
        type:Number,
        required:true
    },
    address:  {
        type:String,
        required:true
    },
    desc:  {
        type:String,
        required:true
    }
});


const users= new mongoose.model('users',userSchema);

module.exports=users;
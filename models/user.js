const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
    //things to be given in signup
    username: String,
    password: String,
   email: String,
   phone: String,
   userType: {type: String, enum: ['business', 'client']},
   firstName: String,
   lastName: String,
   //things to be added after signup
   businessName: {type: String},
   businessDescription: {type: String},
   websiteURL: {type: String},
   //the user's meets
   meets: [{Type: Schema.Types.ObjectId}],
   },
    {timestamps: true},
    );


  const User = mongoose.model("User", userSchema);


  module.exports = User;
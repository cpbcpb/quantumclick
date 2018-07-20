const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    //things to be given in signup
    username: String,
    password: String,
   email: String,
   phone: String,
   isBusiness: {type: Boolean, default: false},
   firstName: String,
   lastName: String,
   //things to be added after signup
   businessName: {type: String},
   businessDescription: {type: String},
   websiteURL: {type: String},
   //the user's connections
   connections: [{type: Schema.Types.ObjectId}
],  
   meets: [{type: Schema.Types.ObjectId, ref: 'Meet'}
        ],
},
    {timestamps: true},
    );


  const User = mongoose.model("User", userSchema);


  module.exports = User;
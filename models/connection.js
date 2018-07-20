//connections are 1 way - ie the client creates the connection and the provider
//approves the connection //so that the client can access meets the provider
//has available and the client can reserve them...
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
//if doesn't work try just ObjectId
const connectionSchema = new Schema({
business: {type: Schema.Types.ObjectId, ref: 'User',},
customer: {type: Schema.Types.ObjectId, ref: 'User',},
approvedByBusiness: {type: Boolean, default: false},
approvedByCustomer: {type: Boolean, default: false},
sharedMeets:[{type:Schema.Types.ObjectId, ref:'Meet' }],

  });
  const Connection = mongoose.model("Connection", connectionSchema);


  module.exports = Connection; 

  // theUser.username
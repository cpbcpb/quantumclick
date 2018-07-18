//connections are 1 way - ie the client creates the connection and the provider
//approves the connection //so that the client can access meets the provider
//has available and the client can reserve them...

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const relationshipSchema = new Schema({
business: Schema.Types.ObjectId,
customer: Schema.Types.ObjectId,
approvedByBusiness: Boolean,
approvedByCustomer: Boolean,
Meets:[{Type:Schema.Types.ObjectId}],

  });
  const Relationship = mongoose.model("Relationship", relationshipSchema);


  module.exports = Relationship; 
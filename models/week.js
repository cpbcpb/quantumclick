
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const weekSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required:true},
    startDate: {type: Date, required: true},
    monday:[{
        time: Date,
        working: Boolean,
        taken: Boolean}]
 })

  const Week = mongoose.model("Week", weekSchema);


  module.exports = Week;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const meetSchema = new Schema({
//the user who created the appointment
    business: {type: Schema.Types.ObjectId, required: true},
//the user who reserved the appointment
    client: {type: Schema.Types.ObjectId, required: true},
//date of upcoming meeting
    date: {type: String, required: true},
//time of upcoming meeting
    time: {type: String, required: true},
//duration of upcoming meeting
    duration: {type: Number, default: 30, enum:[30, 45, 60, 90, 120]},
    status: {type: String, default: 'upcoming', enum:['upcoming', 'canceled', 'missed', 'met',]},
  });


  const Meet = mongoose.model("Meet", meetSchema);


  module.exports = Meet;
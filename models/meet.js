const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const meetSchema = new Schema({
//the user who created the appointment
    business: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//the user who reserved the appointment
    client: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//start date and time of upcoming meeting
    datetime: {type: Date, required: true},
//duration of upcoming meeting
    durationinMinutes: {type: Number, default: 30, enum:[30, 45, 60, 90, 120]},
    status: {type: String, default: 'upcoming', enum:['upcoming', 'canceled', 'missed', 'completed',]},
  });


  const Meet = mongoose.model("Meet", meetSchema);


  module.exports = Meet;
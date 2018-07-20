const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const meetSchema = new Schema({
    meetName: {type: String,},
    business: {type: Schema.Types.ObjectId, ref: 'User',},
    customers: [{type: Schema.Types.ObjectId, ref: 'User'}], default:[],
    dateTime: {type: Date,},
    durationInMinutes: {type: Number, default: 30, enum:[30, 45, 60, 90, 120]},
    location: String,
    isConfirmed: Boolean,
    isCanceled: Boolean,
    isCompleted: Boolean,
    isMissed: Boolean,

  });

  const Meet = mongoose.model("Meet", meetSchema);

  module.exports = Meet;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const meetSchema = new Schema({
    business: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    client: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    datetime: {type: Date, required: true},
    durationinMinutes: {type: Number, default: 30, enum:[30, 45, 60, 90, 120]},
    status: {type: String, default: 'upcoming', enum:['upcoming', 'canceled', 'missed', 'completed',]},
  });

  const Meet = mongoose.model("Meet", meetSchema);

  module.exports = Meet;
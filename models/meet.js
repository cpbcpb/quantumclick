const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetSchema = new Schema({
  meetName: { type: String },
  business: { type: Schema.Types.ObjectId, ref: "User" },
  customers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dateTime: { type: Date },
  durationInMinutes: { type: Number, default: 30, enum: [30, 45, 60, 90, 120] },
  location: String,
  isConfirmed: Boolean,
  isCanceled: Boolean,
  isCompleted: Boolean,
  isMissed: Boolean,
  imageURL: {
    type: String,
    default:
      "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  }
});

const Meet = mongoose.model("Meet", meetSchema);

module.exports = Meet;

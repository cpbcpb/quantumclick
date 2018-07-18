//I want to be able to 

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const workWeek = new Schema({
//the array for each day is used as start times for appointments
//
    mon: [ {time: {number: {type:Number}
        ,
                }}], default: [time: {number: 9,
                                        taken: false},
                                    ]
    tues: {type: Boolean, default: true},
    wed: {type: Boolean, default: true},
    thur:{type: Boolean, default: true},
    fri: {type: Boolean, default: true},
    sat: {type: Boolean, default: false},
    sun: {type: Boolean, default: false},   
});


  const Meet = mongoose.model("Availability", availabilitySchema);


  module.exports = Availability;
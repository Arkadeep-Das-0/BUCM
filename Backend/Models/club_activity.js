const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const club_activitySchema = new Schema({
  club_name: { type: String, required: true },
  room_number: { type: String, required: true },
  financial_request: { type: String, required: true }
});

const Club_activity = mongoose.model('Club_activity', club_activitySchema);

module.exports = Club_activity;

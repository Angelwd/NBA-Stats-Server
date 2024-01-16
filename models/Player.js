const { model, Schema } = require("mongoose")

const playerSchema = new Schema({
    // playerId: String,
    // fullName: String,
    // teamId: String,
    // position: String,
    // jerseyNumber: Number,
    // height: String, // e.g., "6'6"
    // weight: Number, // in pounds
    // birthdate: Date,
    // college: String,
    // draftYear: Number,
    // draftRound: Number,
    // draftPick: Number,
    // careerStats: {
    //   points: Number,
    //   assists: Number,
    //   rebounds: Number,
    //   steals: Number,
    //   blocks: Number,
    //   turnovers: Number,
    //   fieldGoalPercentage: Number, // e.g., 45.5 for percentages
    //   threePointPercentage: Number,
    //   freeThrowPercentage: Number,
    //   minutesPerGame: Number,
    //   gamesPlayed: Number,
  }, 
{
  strict: false
})


module.exports = model("Player", playerSchema);
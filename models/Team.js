const { model, Schema } = require("mongoose")

const teamSchema = new Schema({
    teamId: String,
    fullName: String,
    abbreviation: String,
    city: String,
    conference: String,
    division: String,
    foundedYear: Number,
    coach: String,
    championships: Number,
    teamStats: {
      wins: Number,
      losses: Number,
      winPercentage: Number, // e.g., 0.732 (73.2%)
      pointsPerGame: Number,
      assistsPerGame: Number,
      reboundsPerGame: Number,
      stealsPerGame: Number,
      blocksPerGame: Number,
      turnoversPerGame: Number,
      fieldGoalPercentage: Number,
      threePointPercentage: Number,
      freeThrowPercentage: Number,
  
  }, 
})


module.exports = model("Team", teamSchema);
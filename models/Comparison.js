const { model, Schema } = require('mongoose')

const comparisonSchema = new Schema({

    user: {type: Schema.Types.ObjectId, ref: "User"},
    player1: {type: Schema.Types.ObjectId, ref: "Player"},
    player2: {type: Schema.Types.ObjectId, ref: "Player"},
    player1Stats: {type: Schema.Types.ObjectId, ref: "PlayerStat"},
    player2Stats: {type: Schema.Types.ObjectId, ref: "PlayerStat"}
},
{
    timestamps: true
}
)

module.exports = model("Comparison", comparisonSchema)
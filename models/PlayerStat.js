const { model, Schema } = require('mongoose')

const playerStatSchema = new Schema({

    playerId: Number,
    first_name: String,
    last_name: String,
    games_played: Number,
    player_id: Number,
    season: Number,
    min: String,
    fgm: Number,
    fga: Number,
    fg3m: Number,
    fg3a: Number,
    ftm: Number,
    fta: Number,
    oreb: Number,
    dreb: Number,
    reb: Number,
    ast: Number,
    stl: Number,
    blk: Number,
    turnover: Number,
    pf: Number,
    pts: Number,
    fg_pct: Number,
    fg3_pct: Number,
    ft_pct: Number

},
{
    timestamps: true
})

module.exports = model('PlayerStat', playerStatSchema)






// "player_id": 145,







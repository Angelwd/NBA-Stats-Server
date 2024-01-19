var express = require('express');
var router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated')

const Player = require('../models/Player')
const PlayerStat =  require('../models/PlayerStat')
const Comparison = require('../models/Comparison')

/* GET home page. */
router.get('/create/:playerId', isAuthenticated, async (req, res, next) => {

    try {
        let player1 = await Player.findById(req.params.playerId)
        let player1Stats = await PlayerStat.findOne({first_name: player1.firstname,
            last_name: player1.lastname})
    
        if (player1Stats) {
            console.log("Player 1 info:", player1, player1Stats)
    
        let newComparison = await Comparison.create({
                user: req.user._id,
                player1: player1._id,
                player1Stats: player1Stats._id
            })

        let populatedComparison = await newComparison.populate("user player1 player1Stats")

        console.log("New comparison", populatedComparison)

        res.json(newComparison)
  
        }

    } catch(err) {
        console.log(err)
        res.json(err)
    }
    
});


router.get('/add/:playerId/:comparisonId', isAuthenticated, async (req, res, next) => {

    try {
        let player2 = await Player.findById(req.params.playerId)
        let player2Stats = await PlayerStat.findOne({first_name: player2.firstname,
            last_name: player2.lastname})
    
        if (player2Stats) {
            console.log("Player 1 info:", player2, player2Stats)
    
        let updatedComparison = await Comparison.findByIdAndUpdate(req.params.comparisonId, {
                player2: player2._id,
                player2Stats: player2Stats._id
            }, { new: true})

        let populatedComparison = await updatedComparison.populate("user player1 player1Stats player2 player2Stats")

        console.log("New comparison", populatedComparison)

        res.json(populatedComparison)
  
        }

    } catch(err) {
        console.log(err)
        res.json(err)
    }

});


router.get('/certain-comparison/:comparisonId', (req, res, next) => {
    Comparison.findById(req.params.comparisonId)
    .populate("user player1 player1Stats player2 player2Stats")
        .then((foundComparison) => {
            res.json(foundComparison)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/my-comparisons', isAuthenticated, (req, res, next) => {
    Comparison.find({user: req.user._id})
    .populate("user player1 player1Stats player2 player2Stats")
    .then((foundComparisons) => {
        res.json(foundComparisons)
    })
    .catch((err) => {
        console.log(err)
    })

})

router.delete('/delete/:id', (req, res, next) => {
    Comparison.findByIdAndDelete(req.params.id)
        .then((deleted) => {
            res.json(deleted)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;

// user: {type: Schema.Types.ObjectId, ref: "User"},
// player1: {type: Schema.Types.ObjectId, ref: "Player"},
// player2: {type: Schema.Types.ObjectId, ref: "Player"},
// player1Stats: {type: Schema.Types.ObjectId, ref: "PlayerStat"},
// player2Stats: {type: Schema.Types.ObjectId, ref: "PlayerStat"}
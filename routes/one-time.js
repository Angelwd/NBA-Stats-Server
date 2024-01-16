var express = require('express');
var router = express.Router();
var axios = require('axios')

const Player = require('../models/Player')

/* GET home page. */
// router.get('/', async (req, res, next) => {

//     try {
//         let teamsResponse = await axios.get('https://api-nba-v1.p.rapidapi.com/teams',{
//             headers: { 'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY },
//           })
    
//         let teamsData = await teamsResponse.data.response

//         // console.log("Teams Data", teamsData)

//         // res.json(teamsData)
    
//         let nbaTeams = teamsData.filter((team) => team.nbaFranchise == true)

//         // console.log("Nba Teams ===> ", nbaTeams)
    
//         let nbaNumbers = nbaTeams.map((team) => team.id)
    
//         // console.log("Numbers ===>", nbaNumbers)
    
//         let promises = nbaNumbers.map((id) => {
//             return axios.get(`https://api-nba-v1.p.rapidapi.com/players?team=${id}&season=2023`,{
//                 headers: { 'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY },
//               })
//         })
    
//         let promiseResults = await Promise.allSettled(promises)
    
//         let results = promiseResults.flat().filter((res) => res.value).map((fin) => fin.value.data.response).flat()

//         // console.log("Results ===>", results)
    
//         let playerData = await results

//         console.log("Player DATA length ===>", playerData.length)


    
//         let playerPromises = playerData.map((player) => {
//             return axios.get(`https://api-nba-v1.p.rapidapi.com/players?id=${player.id}`,{
//                 headers: { 'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY },
//               })
//         })
       
    
//         // console.log("Player promises ===>", playerPromises)

//         let interval

//         let timedResults = []

//         setTimeout(async () => {

//             console.log("In timeout")

//             let counter = 1

//             interval = setInterval(async () => {

//                 // if (counter < 241) {
//                 if (counter < 50) {
//                     let resolution = await Promise.allSettled([playerPromises[counter]])
//                     console.log("resolution ===>", resolution)
//                     timedResults.push(resolution.data)
//                     console.log("Counter ===> ", counter)
//                     counter++
//                 } else {
//                     clearInterval(interval)
//                     let playerAdds = timedResults.map((player) => {
//                         return Player.create(player)
//                     })
//                     let finalPlayers = await Promise.all(playerAdds)
    
//                     console.log("New Players", finalPlayers)
//                 }

//             }, 7000)

//         }, 60000)
    
//         // let playerRecords = await Promise.allSettled(playerPromises)

//         // console.log("Player records ===>", playerRecords)
    
//         // let playerAdds = timedResults.map((player) => {
//         //     return Player.create(player)
//         // })
    
//         // let finalPlayers = await Promise.all(playerAdds)
    
//         // console.log("New Players", finalPlayers)

//     } catch(err) {
//         // console.log(err)
//         res.json(err)
//     }



    
// });

router.get('/again', async (req, res, next) => {

    try {
        let teamsResponse = await axios.get('https://api-nba-v1.p.rapidapi.com/teams',{
            headers: { 'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY },
          })
    
        let teamsData = await teamsResponse.data.response

        // console.log("Teams Data", teamsData)

        // res.json(teamsData)
    
        let nbaTeams = teamsData.filter((team) => team.nbaFranchise == true)

        // console.log("Nba Teams ===> ", nbaTeams)
    
        let nbaNumbers = nbaTeams.map((team) => team.id)
    
        // console.log("Numbers ===>", nbaNumbers)
    
        let promises = nbaNumbers.map((id) => {
            return axios.get(`https://api-nba-v1.p.rapidapi.com/players?team=${id}&season=2023`,{
                headers: { 'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY },
              })
        })
    
        let promiseResults = await Promise.allSettled(promises)

        // console.log("Promise results", promiseResults.length)
    
        let results = promiseResults.flat().filter((res) => res.value).map((fin) => {
            console.log("Internal results", fin.value.data.parameters.team)
            return fin.value.data.response.map((el, i, arr) => {
                arr[i].teamId = fin.value.data.parameters.team
                return el
                })}).flat()

        // console.log("Results ===>", results)
    
        let playerData = await results

        playerData.forEach((element, i, arr) => {
            let foundTeam = nbaTeams.find((el) => el.id.toString() == arr[i].teamId)
            console.log("found Team", foundTeam)
            arr[i].team = foundTeam.name
            arr[i].teamCode = foundTeam.code
            arr[i].city = foundTeam.city
            arr[i].teamLogo = foundTeam.logo
            arr[i].league = foundTeam.leagues.standard
           
        })

        console.log("Player DATA length ===>", playerData.length)

        let newPlayerPromises = playerData.map((player) => {
            return Player.create({...player, playerId: player.id})
        })

        let newPlayers = await Promise.allSettled(newPlayerPromises)

        console.log("New Players ===>", newPlayers)

        res.json(newPlayers)


    
        // let playerPromises = playerData.map((player) => {
        //     return axios.get(`https://api-nba-v1.p.rapidapi.com/players?id=${player.id}`,{
        //         headers: { 'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY },
        //       })
        // })
       
    
        // console.log("Player promises ===>", playerPromises)

        // let interval

        // let timedResults = []

        // setTimeout(async () => {

        //     console.log("In timeout")

        //     let counter = 1

        //     interval = setInterval(async () => {

        //         // if (counter < 241) {
        //         if (counter < 50) {
        //             let resolution = await Promise.allSettled([playerPromises[counter]])
        //             console.log("resolution ===>", resolution)
        //             timedResults.push(resolution.data)
        //             console.log("Counter ===> ", counter)
        //             counter++
        //         } else {
        //             clearInterval(interval)
        //             let playerAdds = timedResults.map((player) => {
        //                 return Player.create(player)
        //             })
        //             let finalPlayers = await Promise.all(playerAdds)
    
        //             console.log("New Players", finalPlayers)
        //         }

        //     }, 7000)

        // }, 60000)
    
        // let playerRecords = await Promise.allSettled(playerPromises)

        // console.log("Player records ===>", playerRecords)
    
        // let playerAdds = timedResults.map((player) => {
        //     return Player.create(player)
        // })
    
        // let finalPlayers = await Promise.all(playerAdds)
    
        // console.log("New Players", finalPlayers)

    } catch(err) {
        // console.log(err)
        res.json(err)
    }



    
});

module.exports = router;

// {
//   "id": 382,
//   "firstname": "Dejounte",
//   "lastname": "Murray",
//   "birth": {
//       "date": "1996-09-19",
//       "country": "USA"
//   },
//   "nba": {
//       "start": 2016,
//       "pro": 4
//   },
//   "height": {
//       "feets": "6",
//       "inches": "4",
//       "meters": "1.93"
//   },
//   "weight": {
//       "pounds": "180",
//       "kilograms": "81.6"
//   },
//   "college": "Washington",
//   "affiliation": "Washington/USA",
//   "leagues": {
//       "standard": {
//           "jersey": 5,
//           "active": true,
//           "pos": "G"
//       }
//   }
// },

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
// }, 


// [
//   {
//       "id": 1,
//       "name": "Atlanta Hawks",
      
//       "code": "ATL",
//       "city": "Atlanta",
//       "logo": "https://upload.wikimedia.org/wikipedia/fr/e/ee/Hawks_2016.png",
     
     
//       "leagues": {
//           "standard": {
//               "conference": "East",
//               "division": "Southeast"
//           },
         
          
//           }
//       }
//   },
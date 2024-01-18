var express = require("express");
var router = express.Router();

const Player = require("../models/Player");

router.post("/", (req, res, next) => {
  Player.create(req.body)
    .then((createdPlayer) => {
      console.log("Player created ->", createdPlayer);
      res.status(201).send(createdPlayer);
    })
    .catch((error) => {
      console.error("Error while creating the Player ->", error);
      res.status(500).send({ error: "Failed to create the Player" });
    });
});

router.get("/", (req, res, next) => {
    console.log("Hitting get route");
    Player.find()
      .then((foundPlayers) => {
        console.log(foundPlayers);
        res.status(201).send(foundPlayers);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });

router.get("/this-player/:id", (req, res, next) => {
  console.log("Hitting get route");
  Player.findById(req.params.id)
    .then((foundPlayers) => {
      console.log(foundPlayers);
      res.status(201).json(foundPlayers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/team/:code', (req, res, next) => {
  Player.find({teamCode: req.params.code})
    .then((foundPlayers) => {
      res.json(foundPlayers)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post("/update/:id", (req, res, next) => {
  Player.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPlayer) => {
      console.log(updatedPlayer);
      res.status(200).send(updatedPlayer);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get("/delete/:id", (req, res, next) => {
  Player.findByIdAndDelete(req.params.id)
    .then((updatedPlayer) => {
      console.log(updatedPlayer);
      res.status(200).send(updatedPlayer);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;
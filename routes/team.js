var express = require("express");
var router = express.Router();

const Team = require("../models/Team");

router.post("/", (req, res, next) => {
  Team.create(req.body)
    .then((createdTeam) => {
      console.log("Team created ->", createdTeam);
      res.status(201).send(createdTeam);
    })
    .catch((error) => {
      console.error("Error while creating the Team ->", error);
      res.status(500).send({ error: "Failed to create the Team" });
    });
});

router.get("/", (req, res, next) => {
    console.log("Hitting get route");
    Team.find()
      .then((foundTeams) => {
        console.log(foundTeams);
        res.status(201).send(foundTeams);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });

router.get("/:id", (req, res, next) => {
  console.log("Hitting get route");
  Team.findById(req.params.id)
    .then((foundTeams) => {
      console.log(foundTeams);
      res.status(201).send(foundTeams);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.post("/update/:id", (req, res, next) => {
  Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedTeam) => {
      console.log(updatedTeam);
      res.status(200).send(updatedTeam);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get("/delete/:id", (req, res, next) => {
  Team.findByIdAndDelete(req.params.id)
    .then((updatedTeam) => {
      console.log(updatedTeam);
      res.status(200).send(updatedTeam);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;
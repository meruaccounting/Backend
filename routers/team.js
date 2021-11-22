const express = require("express");
const Team = require("../models/team");
const User = require("../models/user");

const router = express.Router();

router.post("/add/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  try {
    const team = new Team({
      name,
    });
    console.log(team);
    await team.save();
    team.employees.push(id);
    await team.save();

    res.json({
      status: "Ok",
      data: team,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});

router.patch("/updateMember", async (req, res) => {
  const employeeId = req.body.employeeId;
  const teamId = req.body.teamId;
  var alreadyMember = false;
  try {
    const team = await Team.findById(teamId);
    console.log(team);
    team.employees.forEach((employee) => {
      console.log(employee);
      console.log(employeeId);

      if (employee.equals(employeeId)) {
        console.log("Inside IF");
        alreadyMember = true;
      }
    });
    if (alreadyMember == true) {
      return res.json({
        status: "Ok",
        data: "Already A Member",
      });
    }
    team.employees.push(employeeId);
    await team.save();

    res.json({
      status: "Ok",
      data: team,
    });
  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});

router.delete("/removeMember", async (req, res) => {

  const employeeId = req.body.employeeId;

  const teamId = req.body.teamId;
  
  var alreadyMember = false;

  try {
    const team = await Team.findById(teamId);
    console.log(team);
    team.employees.forEach((employee, index) => {
      console.log(employee);
      console.log(employeeId);

      if (employee.equals(employeeId)) {
        console.log("Inside IF");
        alreadyMember = true;
        team.employees.splice(index, 1);
      }
    });

    if (alreadyMember == false) {
      return res.json({
        status: "Ok",
        data: "No Member Found",
      });
    }

    await team.save();

    res.json({
      status: "Ok",
      data: team,
    });

  } catch (error) {
    res.json({
      status: "Error",
      data: error,
    });
  }
});
module.exports = router;

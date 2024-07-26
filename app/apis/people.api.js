const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/people.controller");

router.get("/", PeopleController.getAllMalePeopleByFilter);
router.get("/get-one-person/:id", PeopleController.findOne);
router.get("/family-tree", PeopleController.getAllPeople);
router.post("/create-person", PeopleController.createPerson);
router.get("/person-details", PeopleController.getPersonDetails);
router.get("/get-all-people", PeopleController.getAllPeopleOfManager);
router.get("/get-all-father", PeopleController.getAllFather);
router.delete("/delete-person/:id", PeopleController.deletePerson);
router.put("/update-person/:id", PeopleController.updateDataPerson);

module.exports = router;

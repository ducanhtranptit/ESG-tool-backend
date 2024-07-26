const PeopleActions = require("../actions/people.actions");
const {
  SuccessResponse,
  ErrorResponse,
  ForbiddenResponse,
  BadRequestResponse,
} = require("../core/ApiResponse.js");

class PeopleController {
  async getAllPeople(req, res) {
    try {
      const people = await PeopleActions.getAllPeopleOfFamilyTree();
      return new SuccessResponse().send(req, res, people);
    } catch (error) {
      console.error(error);
      return new ErrorResponse().send(req, res);
    }
  }

  async findOne(req, res) {
    const { id } = req.params;
    if (!id) {
      return new BadRequestResponse().send(req, res);
    }
    try {
      const result = await PeopleActions.findOne(id);
      return new SuccessResponse().send(req, res, result);
    } catch (error) {
      return new ErrorResponse().send(req, res);
    }
  }

  async getAllMalePeopleByFilter(req, res) {
    try {
      const filters = req.query;
      const malePeople = await PeopleActions.getAllPeople(filters);
      return new SuccessResponse().send(req, res, malePeople);
    } catch (error) {
      console.error(error);
      return new ErrorResponse().send(req, res);
    }
  }

  async createPerson(req, res) {
    try {
      const { person, spouse } = req.body;

      if (!person) {
        return new ForbiddenResponse().send(req, res);
      }

      await PeopleActions.createPersonAndTheirSpouse(person, spouse);

      return new SuccessResponse().send(req, res);
    } catch (error) {
      console.error(error);
      return new ErrorResponse().send(req, res);
    }
  }

  async getPersonDetails(req, res) {
    try {
      const filters = req.query;
      const person = await PeopleActions.findOneForProfilePage(filters);
      return new SuccessResponse().send(req, res, person);
    } catch (error) {
      console.error(error);
      return new ErrorResponse().send(req, res);
    }
  }

  async getAllPeopleOfManager(req, res) {
    try {
      const people = await PeopleActions.getAllPeopleOfManagerByFilters(
        req.query
      );
      return new SuccessResponse().send(req, res, people);
    } catch (error) {
      console.error(error);
      return new ErrorResponse().send(req, res);
    }
  }
  async getAllFather(req, res) {
    try {
      const fathers = await PeopleActions.getAllFather();
      return new SuccessResponse().send(req, res, fathers);
    } catch (error) {
      console.error(error);
      return new ErrorResponse().send(req, res);
    }
  }
  async deletePerson(req, res) {
    try {
      const { id } = req.params;
      const result = await PeopleActions.deletePerson(id);
      console.log(result);
      if (result !== 0 && !result) {
        return new BadRequestResponse().send(req, res);
      }
      return new SuccessResponse().send(req, res);
    } catch (error) {
      console.error(error);
      return new ErrorResponse().send(req, res);
    }
  }
  async updateDataPerson(req, res) {
    try {
      const { id } = req.params;
      const dataPerson = req.body;
      if (!dataPerson) {
        return new ForbiddenResponse().send(req, res);
      }
      await PeopleActions.updateDataPerson(id, dataPerson);
      return new SuccessResponse().send(req, res);
    } catch (error) {
      console.error(error);
      return new ErrorResponse().send(req, res);
    }
  }
}

module.exports = new PeopleController();

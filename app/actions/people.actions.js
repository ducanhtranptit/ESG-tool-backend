const { Sequelize, where } = require("sequelize");
const { Op } = require("sequelize");
const model = require("../models/index");
const People = model.People;
class PeopleActions {
  static buildSearchConditions(filters) {
    const conditions = {};
    if (filters.name) {
      conditions.name = {
        [Sequelize.Op.like]: `%${filters.name}%`,
      };
    }
    if (filters.gender) {
      conditions.gender = filters.gender;
    }
    if (filters.yearBorn) {
      conditions.yearBorn = filters.yearBorn;
    }
    if (filters.spouseId) {
      conditions.spouseId = filters.spouseId;
    }
    if (filters.fatherId) {
      conditions.fatherId = filters.fatherId;
    }
    return conditions;
  }

  async findOne(id) {
    const person = await People.findByPk(id);
    return person;
  }

  static async transformArrayToJson(people) {
    const buildFamilyTree = (personId) => {
      const person = people.find((item) => item.id === personId);
      const children = people.filter((item) => item.fatherId === personId);
      const result = {
        name: person.name,
        spouse: person.spouseId
          ? people.find((item) => item.id === person.spouseId).name
          : null,
        children: [],
      };
      children.forEach((child) => {
        result.children.push(buildFamilyTree(child.id));
      });
      return result;
    };
    const rootPerson = people.find((item) => item.note === "rootPerson");
    if (!rootPerson) {
      return null;
    }
    return buildFamilyTree(rootPerson.id, people);
  }
  static async findAllDescendants(personId) {
    const descendants = [];
    const children = await People.findAll({
      where: { fatherId: personId },
    });
    for (const child of children) {
      descendants.push(child.id);
      if (child.spouseId) {
        descendants.push(child.spouseId);
      }
      const childDescendants = await PeopleActions.findAllDescendants(child.id);
      descendants.push(...childDescendants);
    }
    return descendants;
  }

  async deletePerson(id) {
    const person = await People.findByPk(id);
    if (person?.dataValues?.note === "rootPerson") {
      return null;
    }
    const allDescendants = await PeopleActions.findAllDescendants(id);
    await People.destroy({ where: { id: allDescendants } });
    await People.destroy({ where: { id } });
    if (person.fatherId !== null && person.spouseId !== null) {
      return await People.destroy({ where: { id: person.spouseId } });
    } else {
      return await People.update(
        { spouseId: null },
        { where: { id: person.spouseId } }
      );
    }
  }

  async getAllPeopleOfFamilyTree() {
    const people = await People.findAll();
    const familyTree = await PeopleActions.transformArrayToJson(people);
    return familyTree;
  }

  async getAllPeople(filters) {
    const conditions = PeopleActions.buildSearchConditions(filters);
    conditions.fatherId = { [Sequelize.Op.not]: null };
    const malePeople = await People.findAll({
      where: conditions,
      attributes: ["id", "name"],
    });
    return malePeople;
  }

  async getAllPeopleOfManagerByFilters(filters) {
    const conditions = PeopleActions.buildSearchConditions(filters);
    const people = await People.findAll({
      where: conditions,
    });
    return people;
  }

  async getAllFather() {
    const fathers = await People.findAll({
      where: {
        [Op.and]: [
          { name: { [Op.like]: "Trần%" } },
          { gender: "male" },
          { spouseId: { [Op.not]: null } },
        ],
      },
    });
    return fathers;
  }

  async updateDataPerson(id, dataPerson) {
    console.log(dataPerson);
    const person = await People.findByPk(id);
    if (person) {
      await person.update({
        name: dataPerson.person.name,
        gender: dataPerson.person.gender,
        fatherId: dataPerson.person.fatherId,
        description: dataPerson.person.description,
        filePath: dataPerson.person.filePath,
      });
    }
    if (dataPerson.spouse && dataPerson.spouse.name !== "") {
      const spouse = await People.findOne({
        where: { spouseId: person.id },
      });
      if (!spouse) {
        const newSpouseData = {
          name: dataPerson.spouse.name,
          gender: dataPerson.spouse.gender,
          spouseId: person.id,
          description: dataPerson.spouse.description,
          filePath: dataPerson.spouse.filePath,
        };
        const newSpouse = await People.create(newSpouseData);
        await People.update({ spouseId: newSpouse.id }, { where: { id: id } });
      } else {
        await spouse.update({
          name: dataPerson.spouse.name,
          gender: dataPerson.spouse.gender,
          description: dataPerson.spouse.description,
        });
      }
    }
  }

  async createPersonAndTheirSpouse(person, spouse) {
    const newPerson = await People.create(person);
    if (spouse && spouse.name !== "") {
      spouse.spouseId = newPerson.id;
      const newSpouse = await People.create(spouse);
      await People.update(
        { spouseId: newSpouse.id },
        { where: { name: newPerson.name } }
      );
    }
  }

  async findOneForProfilePage(filters) {
    const conditions = PeopleActions.buildSearchConditions(filters);
    const person = await People.findOne({ where: conditions });
    const spouse = await People.findOne({
      where: { spouseId: person.id },
      attributes: ["name"],
    });
    const father = await People.findOne({
      where: { id: person.fatherId },
      attributes: ["name"],
    });
    let children = await People.findAll({
      where: { fatherId: person.id },
      attributes: ["name"],
    });
    if (children.length === 0 && person.spouseId !== null) {
      children = await People.findAll({
        where: { fatherId: person.spouseId },
        attributes: ["name"],
      });
    }
    const result = {
      person: person,
      father: father,
      spouse: spouse,
      children: children,
    };
    return result;
  }
}

module.exports = new PeopleActions();

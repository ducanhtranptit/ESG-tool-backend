"use strict";
const dummyData = require("./dummy/users.dummy.js");
const familyTree = dummyData.familyTree;
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Users",
			familyTree.map((person) => ({
				name: person.name,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};

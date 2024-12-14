"use strict";
const dummyData = require("./dummy/dummy.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Dummies",
			dummyData.map((index) => {
				return {
					questionCode: index.questionCode,
					answer: index.answer,
					dummy: parseFloat(index.dummy),
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Dummies", null, {});
	},
};

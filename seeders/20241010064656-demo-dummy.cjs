"use strict";
const dummyData = require("./dummy/dummy.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Dummies",
			dummyData.map((company) => {
				return {
					questionCode: company.questionCode,
					answer: company.answer,
					dummy: parseFloat(company.dummy),
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

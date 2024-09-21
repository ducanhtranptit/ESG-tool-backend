"use strict";
const dummyData = require("./dummy/answers.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Answers",
			dummyData.map((company) => {
				return {
					questionCode: company.questionCode,
					companyCode: company.companyCode,
					year: +company.year,
					answer: parseFloat(company.answer),
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Answers", null, {});
	},
};

"use strict";
const dummyData = require("./dummy/answers.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Answers",
			dummyData.map((index) => {
				return {
					questionCode: index.questionCode,
					companyCode: index.companyCode,
					year: +index.year,
					answer:
						index.answer === ""
							? null
							: parseFloat(index.answer),
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

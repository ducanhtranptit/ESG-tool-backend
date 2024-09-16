"use strict";
const dummyData = require("./dummy/questions.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Questions",
			dummyData.map((company) => {
				return {
					questionCode: company.questionCode,
					topicCode: company.topicCode,
					name: company.name,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Questions", null, {});
	},
};

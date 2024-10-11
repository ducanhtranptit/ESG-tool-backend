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
					answer1: company.answer1,
					answer2: company.answer2,
					answer3: company.answer3,
					answer4: company.answer4,
					answer5: company.answer5,
					answer6: company.answer6,
					answer7: company.answer7,
					answer8: company.answer8,
					answer9: company.answer9,
					answer10: company.answer10,
					type: parseInt(company.type),
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

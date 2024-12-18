"use strict";
const dummyData = require("./dummy/questions.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Questions",
			dummyData.map((index) => {
				return {
					questionCode: index.questionCode,
					topicCode: index.topicCode,
					name: index.name,
					section: parseInt(index.section),
					language: index.language,
					polarityIndicating: index.polarityIndicating,
					targetWeight: parseFloat(index.targetWeight),
					answer1: index.answer1,
					answer2: index.answer2,
					answer3: index.answer3,
					answer4: index.answer4,
					answer5: index.answer5,
					answer6: index.answer6,
					answer7: index.answer7,
					answer8: index.answer8,
					answer9: index.answer9,
					answer10: index.answer10,
					type: parseInt(index.type),
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

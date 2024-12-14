"use strict";
const dummyData = require("./dummy/topics.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Topics",
			dummyData.map((index) => {
				return {
					topicCode: index.topicCode,
					language: index.language,
					name: index.name,
					answerGuide: index.answerGuide,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Topics", null, {});
	},
};

"use strict";
const dummyData = require("./dummy/topics.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Topics",
			dummyData.map((company) => {
				return {
					topicCode: company.topicCode,
					name: company.name,
					answerGuide: company.answerGuide,
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

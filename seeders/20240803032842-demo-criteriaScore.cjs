"use strict";
const dummyData = require("./dummy/criteriaScore.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CriteriaScores",
			dummyData.map((index) => ({
				criteriaCode: +index.criteriaCode,
				companyCode: index.companyCode,
				criteriaId: +index.criteriaId,
				year: +index.year,
				metricId: +index.metricId,
				pillarId: +index.pillarId,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CriteriaScores", null, {});
	},
};

"use strict";
const dummyData = require("./dummy/criteriaScore.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CriteriaScores",
			dummyData.map((company) => ({
				criteriaCode: +company.criteriaCode,
				companyCode: company.companyCode,
				criteriaId: +company.criteriaId,
				year: +company.year,
				metricId: +company.metricId,
				pillarId: +company.pillarId,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CriteriaScores", null, {});
	},
};

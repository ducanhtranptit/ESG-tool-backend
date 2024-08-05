"use strict";
const dummyData = require("./dummy/criteriaScore.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CriteriaScores",
			dummyData.map((company) => ({
				criteriaCode: +company.criteriaCode,
				companysCode: company.companysCode,
				criteriaId: +company.criteriaId,
				year: +company.year,
				metricId: +company.metricId,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CriteriaScores", null, {});
	},
};

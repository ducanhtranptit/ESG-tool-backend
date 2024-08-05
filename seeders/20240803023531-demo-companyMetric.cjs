"use strict";
const dummyData = require("./dummy/companyMetrics.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CompanyMetrics",
			dummyData.map((company) => ({
				metricId: +company.metricId,
				companysCode: company.companysCode,
				year: +company.year,
				metric: +company.metric,
				criteriaCode: +company.criteriaCode,
				criteriaId: +company.criteriaId,
				companyId: +company.companyId,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CompanyMetrics", null, {});
	},
};

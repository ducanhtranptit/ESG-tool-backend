"use strict";
const dummyData = require("./dummy/companyMetrics.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CompanyMetrics",
			dummyData.map((company) => {
				return {
					metricId: +company.metricId,
					companyCode: company.companyCode,
					year: +company.year,
					metric:
						company.metric === ""
							? null
							: parseFloat(company.metric),
					criteriaCode: +company.criteriaCode,
					criteriaId: +company.criteriaId,
					companyId: +company.companyId,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CompanyMetrics", null, {});
	},
};

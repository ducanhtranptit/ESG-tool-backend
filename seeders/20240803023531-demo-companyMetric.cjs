"use strict";
const dummyData = require("./dummy/companyMetrics.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CompanyMetrics",
			dummyData.map((index) => {
				return {
					metricId: +index.metricId,
					companyCode: index.companyCode,
					year: +index.year,
					metric:
						index.metric === ""
							? null
							: parseFloat(index.metric),
					criteriaCode: +index.criteriaCode,
					criteriaId: +index.criteriaId,
					companyId: +index.companyId,
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

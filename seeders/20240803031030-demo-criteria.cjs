"use strict";
const dummyData = require("./dummy/criteria.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Criteria",
			dummyData.map((company) => {
				return {
					criteriaId: +company.criteriaId,
					criteriaCode: +company.criteriaCode,
					name: company.name,
					dataType: company.dataType,
					description: company.description,
					pillarId: +company.pillarId,
					categoryId: +company.categoryId,
					measurementMethod:
						company.measurementMethod === "0"
							? null
							: company.measurementMethod,
					applicableIndustryCode: +company.applicableIndustryCode,
					transformationMethod: company.transformationMethod,
					weight: +company.weight,
					unit: company.unit,
					polarityIndicating: company.polarityIndicating,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Criteria", null, {});
	},
};

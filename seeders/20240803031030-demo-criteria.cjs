"use strict";
const dummyData = require("./dummy/criteria.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Criteria",
			dummyData.map((index) => {
				return {
					criteriaId: +index.criteriaId,
					criteriaCode: +index.criteriaCode,
					name: index.name,
					dataType: index.dataType,
					description: index.description,
					pillarId: +index.pillarId,
					categoryId: +index.categoryId,
					measurementMethod:
						index.measurementMethod === "0"
							? null
							: index.measurementMethod,
					applicableIndustryCode: +index.applicableIndustryCode,
					transformationMethod: index.transformationMethod,
					weight: +index.weight,
					unit: index.unit,
					polarityIndicating: index.polarityIndicating,
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

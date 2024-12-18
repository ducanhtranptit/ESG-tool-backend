"use strict";
const dummyData = require("./dummy/target.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Targets",
			dummyData.map((index) => {
				return {
					questionCode: index.questionCode,
					companyCode: index.companyCode,
					yearTarget: parseInt(index.year),
					targetValue: parseFloat(index.value),
					weight: parseFloat(index.weight),
					polarityIndicating: index.polarityIndicating,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Targets", null, {});
	},
};

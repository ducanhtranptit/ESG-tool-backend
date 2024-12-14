"use strict";
const dummyData = require("./dummy/criteria-locales.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CriteriaLocales",
			dummyData.map((index) => {
				return {
					criteriaCode: parseInt(index.criteriaCode),
					name: index.name,
					language: index.language,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CriteriaLocales", null, {});
	},
};

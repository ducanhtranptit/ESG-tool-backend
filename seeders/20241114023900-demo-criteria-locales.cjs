"use strict";
const dummyData = require("./dummy/criteria-locales.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CriteriaLocales",
			dummyData.map((company) => {
				return {
					criteriaCode: parseInt(company.criteriaCode),
					name: company.name,
					language: company.language,
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

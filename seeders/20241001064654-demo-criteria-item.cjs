"use strict";
const dummyData = require("./dummy/criteria-item.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CriteriaItems",
			dummyData.map((company) => {
				return {
					itemId: company.itemId,
					criteriaId: company.criteriaId,
					IChart: company.IChart,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CriteriaItems", null, {});
	},
};

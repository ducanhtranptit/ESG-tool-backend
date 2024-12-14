"use strict";
const dummyData = require("./dummy/criteria-item.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CriteriaItems",
			dummyData.map((index) => {
				return {
					itemId: index.itemId,
					criteriaId: index.criteriaId,
					IChart: index.IChart,
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

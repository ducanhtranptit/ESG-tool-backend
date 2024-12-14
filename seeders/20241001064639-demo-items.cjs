"use strict";
const dummyData = require("./dummy/items.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Items",
			dummyData.map((index) => {
				return {
					itemId: index.itemId,
					name: index.name,
					categoryId: index.categoryId,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Items", null, {});
	},
};

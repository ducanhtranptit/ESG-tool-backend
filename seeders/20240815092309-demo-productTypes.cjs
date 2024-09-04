"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"ProductTypes",
			[
				{ productType: "Sold or leased goods", createdAt: new Date(), updatedAt: new Date() },
				{ productType: "Supplementary materials delivered to customers", createdAt: new Date(), updatedAt: new Date() },
				{ productType: "Materials used to deliver products", createdAt: new Date(), updatedAt: new Date() },
				{ productType: "Service", createdAt: new Date(), updatedAt: new Date() },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("ProductTypes", null, {});
	},
};

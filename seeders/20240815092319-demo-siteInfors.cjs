"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Add seed commands here.
		await queryInterface.bulkInsert(
			"ProductInfors",
			[
				{
					companyId: 1,
					productType: 1,
					productName: "Washing machines",
					revenue: 3000000,
					comment: "Includes 15 similar models",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					companyId: 1,
					productType: 1,
					productName: "Dryers",
					revenue: 2000000,
					comment: "Includes 10 similar models",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					companyId: 1,
					productType: 2,
					productName: "Instruction manuals",
					revenue: 1500,
					comment: "Included with all washers and dryers",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					companyId: 1,
					productType: 3,
					productName: "Wooden pallets",
					revenue: 500,
					comment: "Reused",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					companyId: 1,
					productType: 4,
					productName: "Maintenance",
					revenue: 1000000,
					comment: "",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		// Add commands to revert seed here.
		await queryInterface.bulkDelete("ProductInfors", null, {});
	},
};

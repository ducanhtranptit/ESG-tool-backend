"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Add seed commands here.
		await queryInterface.bulkInsert(
			"SiteInfors",
			[
				{
					overallInforId: 1,
					siteName: "Jonesville plant",
					numberEmployees: 3000,
					comment: "Manufacturing plant",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					overallInforId: 1,
					siteName: "Smithtown warehouse",
					numberEmployees: 100,
					comment: "Warehouse",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					overallInforId: 1,
					siteName: "Brocktown office",
					numberEmployees: 200,
					comment: "Branch office",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					overallInforId: 1,
					siteName: "Edenville office",
					numberEmployees: 300,
					comment: "Branch office",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					overallInforId: 1,
					siteName: "HQ",
					numberEmployees: 500,
					comment: "Headquarters executives and staff",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("SiteInfors", null, {});
	},
};

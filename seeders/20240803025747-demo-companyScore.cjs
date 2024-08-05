"use strict";
const dummyData = require("./dummy/companyScore.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"CompanyScores",
			dummyData.map((company) => ({
				companyId: +company.companyId,
				companyCode: company.companyCode,
				year: +company.year,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("CompanyScores", null, {});
	},
};

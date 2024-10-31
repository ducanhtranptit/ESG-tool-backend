"use strict";
const dummyData = require("./dummy/companys.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Companies",
			dummyData.map((company) => ({
				companyCode: company.companyCode,
				companyName: company.companyName,
				industryId: +company.industryId,
				industryCodeLevel2: +company.industryCodeLevel2,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Companies", null, {});
	},
};

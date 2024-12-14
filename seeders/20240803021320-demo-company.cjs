"use strict";
const dummyData = require("./dummy/companys.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Companies",
			dummyData.map((index) => ({
				companyCode: index.companyCode,
				companyName: index.companyName,
				industryId: +index.industryId,
				industryCodeLevel2: +index.industryCodeLevel2,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Companies", null, {});
	},
};

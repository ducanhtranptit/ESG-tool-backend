"use strict";
const dummyData = require("./dummy/industry.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Industries",
			dummyData.map((company) => ({
				level1: company.level1,
				level2: parseInt(company.level2),
				industryName: company.industryName,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Industries", null, {});
	},
};

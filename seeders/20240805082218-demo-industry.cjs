"use strict";
const dummyData = require("./dummy/industry.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Industries",
			dummyData.map((company) => ({
				level2: +company.level2,
				level3: +company.level3,
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

"use strict";
const dummyData = require("./dummy/industry.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Industries",
			dummyData.map((index) => ({
				level1: index.level1,
				level2: parseInt(index.level2),
				industryName: index.industryName,
				createdAt: new Date(),
				updatedAt: new Date(),
			}))
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Industries", null, {});
	},
};

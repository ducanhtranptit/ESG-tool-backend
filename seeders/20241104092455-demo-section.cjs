"use strict";
const dummyData = require("./dummy/section.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Sections",
			dummyData.map((index) => {
				return {
					sectionName: index.sectionName,
					sectionId: index.sectionId,
					submitCount: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Sections", null, {});
	},
};

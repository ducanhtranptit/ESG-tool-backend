"use strict";
const dummyData = require("./dummy/section.dummy.cjs");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Sections",
			dummyData.map((company) => {
				return {
					sectionName: company.sectionName,
					sectionId: company.sectionId,
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

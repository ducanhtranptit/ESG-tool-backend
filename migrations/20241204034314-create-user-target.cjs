"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("UserTargets", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sectionId: {
				type: Sequelize.INTEGER,
			},
			sectionName: {
				type: Sequelize.STRING,
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			year: {
				type: Sequelize.INTEGER,
			},
			submitCount: {
				type: Sequelize.INTEGER,
			},
			percentileCompleted: {
				type: Sequelize.FLOAT,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("UserTargets");
	},
};

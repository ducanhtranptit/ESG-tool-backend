"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("CriteriaScores", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			criteriaCode: {
				type: Sequelize.INTEGER,
			},
			companysCode: {
				type: Sequelize.STRING,
			},
			criteriaId: {
				type: Sequelize.INTEGER,
			},
			year: {
				type: Sequelize.INTEGER,
			},
			metricId: {
				type: Sequelize.INTEGER,
			},
			scoreMultipleNewCriteriaWeight: {
				type: Sequelize.FLOAT,
			},
			scoreMultipleCriteriaWeight: {
				type: Sequelize.FLOAT,
			},
			score: {
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
		await queryInterface.dropTable("CriteriaScores");
	},
};

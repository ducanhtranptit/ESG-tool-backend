"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Criteria", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			criteriaId: {
				type: Sequelize.INTEGER,
			},
			criteriaCode: {
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.TEXT,
			},
			dataType: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			pillarId: {
				type: Sequelize.INTEGER,
			},
			categoryId: {
				type: Sequelize.INTEGER,
			},
			measurementMethod: {
				type: Sequelize.STRING,
			},
			applicableIndustryCode: {
				type: Sequelize.INTEGER,
			},
			transformationMethod: {
				type: Sequelize.STRING,
			},
			weight: {
				type: Sequelize.FLOAT,
			},
			unit: {
				type: Sequelize.STRING,
			},
			polarityIndicating: {
				type: Sequelize.STRING,
			},
			pillarWeight: {
				type: Sequelize.FLOAT,
			},
			newCriteriaWeight: {
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
		await queryInterface.dropTable("Criteria");
	},
};

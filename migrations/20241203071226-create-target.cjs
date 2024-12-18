"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Targets", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			questionCode: {
				type: Sequelize.STRING,
			},
			companyCode: {
				type: Sequelize.STRING,
			},
			yearTarget: {
				type: Sequelize.INTEGER,
			},
			targetValue: {
				type: Sequelize.FLOAT,
			},
			weight: {
				type: Sequelize.FLOAT,
			},
			percentileCompleted: {
				type: Sequelize.FLOAT,
			},
			polarityIndicating: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("Targets");
	},
};

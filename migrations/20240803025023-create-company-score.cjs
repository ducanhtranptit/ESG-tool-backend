"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("CompanyScores", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			companyId: {
				type: Sequelize.INTEGER,
			},
			companyCode: {
				type: Sequelize.STRING,
			},
			year: {
				type: Sequelize.INTEGER,
			},
			environmentScore: {
				type: Sequelize.FLOAT,
			},
			socialScore: {
				type: Sequelize.FLOAT,
			},
			governanceScore: {
				type: Sequelize.FLOAT,
			},
			esgScore: {
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
		await queryInterface.dropTable("CompanyScores");
	},
};

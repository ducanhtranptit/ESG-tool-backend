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
			environmentRank: {
				type: Sequelize.INTEGER,
			},
			socialScore: {
				type: Sequelize.FLOAT,
			},
			socialRank: {
				type: Sequelize.INTEGER,
			},
			governanceScore: {
				type: Sequelize.FLOAT,
			},
			governanceRank: {
				type: Sequelize.INTEGER,
			},
			esgScore: {
				type: Sequelize.FLOAT,
			},
			esgRank: {
				type: Sequelize.INTEGER,
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

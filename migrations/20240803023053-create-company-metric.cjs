"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("CompanyMetrics", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			metricId: {
				type: Sequelize.INTEGER,
			},
			companyCode: {
				type: Sequelize.STRING,
			},
			year: {
				type: Sequelize.INTEGER,
			},
			metric: {
				type: Sequelize.INTEGER,
			},
			criteriaCode: {
				type: Sequelize.INTEGER,
			},
			criteriaId: {
				type: Sequelize.INTEGER,
			},
			companyId: {
				type: Sequelize.INTEGER,
			},
			noOfCompaniesWithAValue: {
				type: Sequelize.INTEGER,
			},
			noOfCompaniesWithTheSameValueIncludedInTheCurrentOne: {
				type: Sequelize.INTEGER,
			},
			noOfCompaniesWithAWorse: {
				type: Sequelize.INTEGER,
			},
			rank: {
				type: Sequelize.INTEGER,
			},
			score: {
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
		await queryInterface.dropTable("CompanyMetrics");
	},
};

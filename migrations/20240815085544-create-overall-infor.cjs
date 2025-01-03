"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("OverallInfors", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			companyName: {
				type: Sequelize.STRING,
			},
			userId: {
				type: Sequelize.INTEGER,
				unique: true,
			},
			dateFounder: {
				type: Sequelize.INTEGER,
			},
			mainAddress: {
				type: Sequelize.STRING,
			},
			mainPhoneNumber: {
				type: Sequelize.STRING,
			},
			companyWebsite: {
				type: Sequelize.STRING,
			},
			companySector: {
				type: Sequelize.STRING,
			},
			companyDescription: {
				type: Sequelize.TEXT,
			},
			contactInformation: {
				type: Sequelize.TEXT,
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
		await queryInterface.dropTable("OverallInfors");
	},
};

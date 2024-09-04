"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("SiteInfors", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			companyId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "OverallInfors",
					},
					key: "id",
				},
			},
			siteName: {
				type: Sequelize.STRING,
			},
			numberEmployees: {
				type: Sequelize.INTEGER,
			},
			comment: {
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
		await queryInterface.dropTable("SiteInfors");
	},
};

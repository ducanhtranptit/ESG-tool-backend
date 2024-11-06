"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ProductInfors", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			overallInforId: {
				type: Sequelize.INTEGER,
			},
			productType: {
				type: Sequelize.INTEGER,
			},
			productName: {
				type: Sequelize.STRING,
			},
			revenue: {
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
		await queryInterface.dropTable("ProductInfors");
	},
};

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
			companyId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "OverallInfors",
					},
					key: "id",
				},
			},
			productType: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "ProductTypes",
					},
					key: "id",
				},
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

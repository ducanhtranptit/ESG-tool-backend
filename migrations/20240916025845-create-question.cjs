"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Questions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			questionCode: {
				type: Sequelize.STRING,
			},
			topicCode: {
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.TEXT,
			},
			answer1: {
				type: Sequelize.STRING,
			},
			answer2: {
				type: Sequelize.STRING,
			},
			answer3: {
				type: Sequelize.STRING,
			},
			answer4: {
				type: Sequelize.STRING,
			},
			answer5: {
				type: Sequelize.STRING,
			},
			answer6: {
				type: Sequelize.STRING,
			},
			answer7: {
				type: Sequelize.STRING,
			},
			answer8: {
				type: Sequelize.STRING,
			},
			answer9: {
				type: Sequelize.STRING,
			},
			answer10: {
				type: Sequelize.STRING,
			},
			type: {
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
		await queryInterface.dropTable("Questions");
	},
};

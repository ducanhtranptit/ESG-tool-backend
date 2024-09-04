"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", [
			{
				username: "admin",
				password: "$2a$10$oxmJPbDuSxQKQeGx8gbHFeyqJQj.b88u4R5WGnSNZ2ZQYksbosMfC",
				companyId: 1,
				type: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};

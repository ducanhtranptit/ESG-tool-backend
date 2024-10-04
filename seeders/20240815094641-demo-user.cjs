"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", [
			{
				username: "user1",
				password:
					"$2a$12$1jdG.VUzaeDBJrda.BGo8eH4C.tWTzaclbO0KWS5UDoMSfwsSGY6W",
				companyId: 32,
				type: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: "user2",
				password:
					"$2a$12$1jdG.VUzaeDBJrda.BGo8eH4C.tWTzaclbO0KWS5UDoMSfwsSGY6W",
				companyId: 31,
				type: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: "user3",
				password:
					"$2a$12$1jdG.VUzaeDBJrda.BGo8eH4C.tWTzaclbO0KWS5UDoMSfwsSGY6W",
				companyId: 25,
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

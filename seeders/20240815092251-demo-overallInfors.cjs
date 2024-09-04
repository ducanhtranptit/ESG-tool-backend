"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"OverallInfors",
			[
				{
					companyName: "LC Products Ltd.",
					dateFounder: 2000,
					mainAddress: "567 Openfield Avenue, Bigburg, Ontario,  L0L 1C9",
					mainPhoneNumber: "705-555-6666",
					companyWebsite: "www.lcproducts.com",
					companySector: "Manufacturing",
					companyDescription: "We provide sustainable appliances, equipment and services that enable our customers to fulfill their purpose.",
					totalRevenue: 6000000,
					netIncome: 650000,
					fullTimeEmployee: 4100,
					partTimeEmployee: 990,
					contactInformation: "<p><span>Doug Wilson, Board Chair</span></p><p><span>dougw@lcproducts.com</span></p><p><span>905-666-7774&nbsp;&nbsp;x88</span></p>",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("OverallInfors", null, {});
	},
};

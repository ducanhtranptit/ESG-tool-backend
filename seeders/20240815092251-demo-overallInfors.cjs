"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"OverallInfors",
			[
				{
					companyName: "Công ty Cổ phần Thế Giới Di Động",
					userId: 1,
					dateFounder: 2004,
					mainAddress:
						"128 Trần Quang Khải, P. Tân Định, Quận 1, TP. Hồ Chí Minh",
					mainPhoneNumber: "1800 1060",
					companyWebsite: "www.thegioididong.com",
					companySector: "Retail",
					companyDescription:
						"Công ty Cổ phần Thế Giới Di Động là nhà bán lẻ hàng đầu Việt Nam, chuyên cung cấp các sản phẩm công nghệ như điện thoại, laptop, phụ kiện và dịch vụ sửa chữa.",
					contactInformation:
						"<p><span>Nguyễn Đức Tài, Chủ tịch Hội đồng Quản trị</span></p><p><span>Email: contact@thegioididong.com</span></p><p><span>Hotline: 1800 1060</span></p>",
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

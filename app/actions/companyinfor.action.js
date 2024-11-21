import model from "../models/index.js";

export default class CompanyInfoAction {
	static async findAll() {
		const overallInfors = await model.OverallInfor.findAll({
			attributes: [
				"id",
				"userId",
				"companyName",
				"dateFounder",
				"mainAddress",
				"mainPhoneNumber",
				"companyWebsite",
				"companySector",
				"companyDescription",
				"contactInformation",
			],
			raw: true,
		});

		const result = [];

		for (const overallInfor of overallInfors) {
			const siteInfors = await model.SiteInfor.findAll({
				where: { overallInforId: overallInfor.id },
			});
			const productInfors = await model.ProductInfor.findAll({
				where: { overallInforId: overallInfor.id },
			});

			result.push({
				overallInfor,
				siteInfors,
				productInfors,
			});
		}

		return result;
	}

	static async getAllCompanyInfors(userId) {
		const overallInfor = await model.OverallInfor.findOne({
			where: { userId: userId },
			raw: true,
		});
		if (overallInfor === null) {
			return null;
		}
		const siteInfors = await model.SiteInfor.findAll({
			where: { overallInforId: overallInfor.id },
		});
		const productInfors = await model.ProductInfor.findAll({
			where: { overallInforId: overallInfor.id },
		});

		const result = {
			overallInfor,
			siteInfors,
			productInfors,
		};
		return result;
	}

	static async updateCompanyInfor(
		overallInfor,
		siteInfors,
		productInfors,
		userId
	) {
		await model.OverallInfor.upsert(
			{
				userId: userId,
				companyName: overallInfor.companyName,
				dateFounder: parseInt(overallInfor.dateFounder),
				mainAddress: overallInfor.mainAddress,
				mainPhoneNumber: overallInfor.mainPhoneNumber,
				companyWebsite: overallInfor.companyWebsite,
				companySector: overallInfor.companySector,
				companyDescription: overallInfor.companyDescription,
				totalRevenue: parseInt(overallInfor.totalRevenue),
			},
			{
				where: { userId: userId },
			}
		);

		const updatedCompany = await model.OverallInfor.findOne({
			where: { userId: userId },
			raw: true,
		});

		await model.SiteInfor.destroy({
			where: { overallInforId: updatedCompany.id },
		});
		if (siteInfors && siteInfors.length > 0) {
			for (let site of siteInfors) {
				await model.SiteInfor.create({
					overallInforId: updatedCompany.id,
					siteName: site.siteName,
					numberEmployees: parseInt(site.numberEmployees),
					comment: site.comment,
				});
			}
		}

		await model.ProductInfor.destroy({
			where: { overallInforId: updatedCompany.id },
		});
		if (productInfors && productInfors.length > 0) {
			for (let product of productInfors) {
				await model.ProductInfor.create({
					overallInforId: updatedCompany.id,
					productName: product.productName,
					revenue: parseInt(product.revenue),
					comment: product.comment,
				});
			}
		}
	}
}

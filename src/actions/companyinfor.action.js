import model from "../models/index.js";
import UserService from "../services/user.services.js";

export default class CompanyInfoAction {
	static buildSearchConditions(filters) {
		const conditions = {};
		if (filters.companyName) {
			conditions.companyName = {
				[Sequelize.Op.like]: `%${filters.companyName}%`,
			};
		}
		if (filters.companyCode) {
			conditions.companyCode = {
				[Sequelize.Op.like]: `%${filters.companyCode}%`,
			};
		}
		if (filters.industryId) {
			conditions.industryId = filters.industryId;
		}
		if (filters.industryCodeLevel2) {
			conditions.industryCodeLevel2 = filters.industryCodeLevel2;
		}
		return conditions;
	}
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
		const companyInfor = await UserService.getCompanyInfor(userId);
		overallInfor.companyName = companyInfor.companyName;
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
		const companyInfor = await UserService.getCompanyInfor(userId);
		await model.Company.update(
			{ companyName: overallInfor.companyName },
			{ where: { companyCode: companyInfor.companyCode } }
		);

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
				contactInformation: overallInfor.contactInformation,
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

	static async getAllCompany(filter) {
		const conditions = CompanyInfoAction.buildSearchConditions(filter);
		const offset = (filter.page - 1) * filter.limit;
		const companies = await model.Company.findAll({
			where: conditions,
			attributes: [
				"companyCode",
				"companyName",
				"industryId",
				"industryCodeLevel2",
			],
			offset: parseInt(offset, 10),
			limit: parseInt(filter.limit, 10),
			raw: true,
		});
		const total = await model.Dummy.count();
		return {
			data: companies,
			total,
			totalPages: Math.ceil(total / filter.limit),
			currentPage: filter.page,
		};
	}
}

import { Sequelize } from "sequelize";
import model from "../models/index.js";
import UserService from "../services/user.services.js";
import { Op } from "sequelize";

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

	static async findAllCompanyMetrics(filter) {
		const conditions = CompanyInfoAction.buildSearchConditions(filter);
		const offset = (filter.page - 1) * filter.limit;
		const total = await model.CompanyMetric.count();
		const companyMetrics = await model.CompanyMetric.findAll({
			where: conditions,
			attributes: [
				"metricId",
				"companyCode",
				"year",
				"metric",
				"criteriaId",
				"rank",
			],
			offset: parseInt(offset, 10),
			limit: parseInt(filter.limit, 10),
			raw: true,
		});
		const criteriaIds = companyMetrics.map((metric) => metric.criteriaId);
		const criterias = await model.Criteria.findAll({
			where: {
				criteriaId: {
					[Sequelize.Op.in]: criteriaIds,
				},
			},
			raw: true,
		});
		const criteriaMap = criterias.reduce((acc, criteria) => {
			acc[criteria.criteriaId] = {
				name: criteria.name,
			};
			return acc;
		}, {});
		const result = await Promise.all(
			companyMetrics.map(async (companyMetric) => {
				const criteria = criteriaMap[companyMetric.criteriaId];
				return {
					metricId: companyMetric.metricId,
					criteriaName: criteria?.name,
					companyCode: companyMetric.companyCode,
					year: companyMetric.year,
					metric: companyMetric.metric,
					rank: companyMetric.rank,
				};
			})
		);
		return {
			data: result,
			total,
			totalPages: Math.ceil(total / filter.limit),
			currentPage: filter.page,
		};
	}
	static async findAllCompanyScore(filter) {
		const currentYear = new Date().getFullYear();
		const startYear = currentYear - 4;
		const conditions = {
			...CompanyInfoAction.buildSearchConditions(filter),
			year: { [Op.between]: [startYear, currentYear] },
		};
		const offset = (filter.page - 1) * filter.limit;
		const total = await model.CompanyScore.count({ where: conditions });
		const companyScores = await model.CompanyScore.findAll({
			where: conditions,
			attributes: [
				"companyCode",
				"year",
				"environmentScore",
				"environmentRank",
				"socialScore",
				"socialRank",
				"governanceScore",
				"governanceRank",
				"esgScore",
				"esgRank",
			],
			offset: parseInt(offset, 10),
			limit: parseInt(filter.limit, 10),
			raw: true,
		});

		return {
			data: companyScores,
			total,
			totalPages: Math.ceil(total / filter.limit),
			currentPage: filter.page,
		};
	}

	static async findAllIndustries(filter) {
		const conditions = CompanyInfoAction.buildSearchConditions(filter);
		const offset = (filter.page - 1) * filter.limit;
		const total = await model.Industry.count();
		const companyIndustries = await model.Industry.findAll({
			where: conditions,
			attributes: ["level1", "level2", "industryName"],
			offset: parseInt(offset, 10),
			limit: parseInt(filter.limit, 10),
			raw: true,
		});
		return {
			data: companyIndustries,
			total,
			totalPages: Math.ceil(total / filter.limit),
			currentPage: filter.page,
		};
	}
}

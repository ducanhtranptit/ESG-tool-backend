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

		if (filters.level1) {
			conditions.level1 = filters.level1;
		}

		if (filters.level2) {
			conditions.level2 = filters.level2;
		}

		if (filters.industryName) {
			conditions.industryName = filters.industryName;
		}

		if (filters.year) {
			conditions.year = filters.year;
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
		const total = await model.Company.count({ where: conditions });
		return {
			data: companies,
			total,
			totalPages: Math.ceil(total / filter.limit),
			currentPage: filter.page,
		};
	}

	static async findAllCompanyMetrics(filter) {
		try {
			const conditions = CompanyInfoAction.buildSearchConditions(filter);
			const offset = (filter.page - 1) * filter.limit;
			const limit = parseInt(filter.limit, 10);

			let criteriaCondition = {};

			// Nếu filter.criteriaName được truyền vào, tìm các criteriaId tương ứng
			if (filter.criteriaName) {
				// Tìm tất cả các criteriaId từ bảng Criteria thỏa mãn điều kiện filter.criteriaName
				const matchingCriterias = await model.Criteria.findAll({
					attributes: ["criteriaId"],
					where: {
						name: {
							[Sequelize.Op.like]: `%${filter.criteriaName}%`,
						},
					},
					raw: true,
				});

				const matchingCriteriaIds = matchingCriterias.map(
					(c) => c.criteriaId
				);

				// Nếu không có criteria nào thỏa mãn, trả về kết quả rỗng
				if (matchingCriteriaIds.length === 0) {
					return {
						data: [],
						total: 0,
						totalPages: 0,
						currentPage: filter.page,
					};
				}

				// Thêm điều kiện criteriaId phải nằm trong danh sách matchingCriteriaIds
				criteriaCondition = {
					criteriaId: {
						[Sequelize.Op.in]: matchingCriteriaIds,
					},
				};
			}

			// Kết hợp điều kiện từ filter và điều kiện criteriaId (nếu có)
			const finalConditions = {
				...conditions,
				...criteriaCondition,
			};

			// Tính tổng số bản ghi thỏa mãn điều kiện
			const total = await model.CompanyMetric.count({
				where: finalConditions,
			});

			// Nếu total là 0, trả về kết quả rỗng
			if (total === 0) {
				return {
					data: [],
					total,
					totalPages: 0,
					currentPage: filter.page,
				};
			}

			// Lấy dữ liệu từ bảng CompanyMetric với điều kiện đã được cập nhật
			const companyMetrics = await model.CompanyMetric.findAll({
				where: finalConditions,
				attributes: [
					"metricId",
					"companyCode",
					"year",
					"metric",
					"criteriaId",
					"rank",
				],
				offset: offset,
				limit: limit,
				raw: true,
			});

			// Lấy dữ liệu criteria tương ứng với criteriaId
			const criteriaIds = companyMetrics.map(
				(metric) => metric.criteriaId
			);
			const criterias = await model.Criteria.findAll({
				attributes: ["criteriaId", "name"],
				where: {
					criteriaId: {
						[Sequelize.Op.in]: criteriaIds,
					},
				},
				raw: true,
			});

			// Tạo map để ánh xạ criteriaId với name
			const criteriaMap = criterias.reduce((acc, criteria) => {
				acc[criteria.criteriaId] = {
					name: criteria.name,
				};
				return acc;
			}, {});

			// Chuẩn bị dữ liệu kết quả
			const result = companyMetrics.map((companyMetric) => {
				const criteria = criteriaMap[companyMetric.criteriaId];
				return {
					metricId: companyMetric.metricId,
					criteriaName: criteria?.name || "Tiêu chí không tồn tại",
					companyCode: companyMetric.companyCode,
					year: companyMetric.year,
					metric: companyMetric.metric,
					rank: companyMetric.rank,
				};
			});

			// Tính tổng số trang
			const totalPages = Math.ceil(total / limit);

			// Trả về dữ liệu
			return {
				data: result,
				total,
				totalPages,
				currentPage: filter.page,
			};
		} catch (error) {
			console.error("Error in findAllCompanyMetrics:", error);
			throw new Error("Có lỗi xảy ra khi tìm kiếm company metrics.");
		}
	}

	static async findAllCompanyScore(filter) {
		let conditions = CompanyInfoAction.buildSearchConditions(filter);
		const currentYear = new Date().getFullYear();
		const startYear = currentYear - 4;
		if (filter.year && filter.year < startYear) {
			return {
				data: [],
				total: 0,
				totalPages: 0,
				currentPage: filter.page,
			};
		}
		if (!filter.year) {
			conditions = {
				...conditions,
				year: { [Op.between]: [startYear, currentYear] },
			};
		}
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

import model from "../models/index.js";

export default class DashboardAction {
	static async getAllDataForCharts(userId) {
		const userInfor = await model.User.findOne({
			where: {
				id: userId,
			},
		});
		const companyId = userInfor.dataValues.companyId;
		const companyInfor = await model.Company.findOne({
			where: {
				id: companyId,
			},
		});
		const companyCode = companyInfor.dataValues.companyCode;
		const companyScoreESG = await model.CompanyScore.findAll({
			where: {
				companyCode: companyCode,
			},
		});
		const data = [];
		for (let companyScoreESGCurrentYear of companyScoreESG) {
			const companyData = {
				year: companyScoreESGCurrentYear.dataValues.year,
				esg: companyScoreESGCurrentYear.dataValues.esgScore,
				esgRank: companyScoreESGCurrentYear.dataValues.esgRank,
				environmental:
					companyScoreESGCurrentYear.dataValues.environmentScore,
				environmentRank:
					companyScoreESGCurrentYear.dataValues.environmentRank,
				social: companyScoreESGCurrentYear.dataValues.socialScore,
				socialRank: companyScoreESGCurrentYear.dataValues.socialRank,
				governance:
					companyScoreESGCurrentYear.dataValues.governanceScore,
				governanceRank:
					companyScoreESGCurrentYear.dataValues.governanceRank,
			};
			data.push(companyData);
		}

		const result = {
			company: { name: companyCode, data: data },
		};

		return result;
	}
}

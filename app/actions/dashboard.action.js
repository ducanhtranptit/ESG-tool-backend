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
				environmental:
					companyScoreESGCurrentYear.dataValues.environmentScore,
				social: companyScoreESGCurrentYear.dataValues.socialScore,
				governance:
					companyScoreESGCurrentYear.dataValues.governanceScore,
			};
			data.push(companyData);
		}

		const result = {
			company: { name: companyCode, data: data },
		};

		return result;
	}
}

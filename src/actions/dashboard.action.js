import model from "../models/index.js";

export default class DashboardAction {
	static async getAllDataForCharts(userId) {
		const userInfor = await model.User.findOne({ where: { id: userId } });
		const companyId = userInfor.dataValues.companyId;
		const companyInfor = await model.Company.findOne({
			where: { id: companyId },
		});
		const companyCode = companyInfor.dataValues.companyCode;
		const companyScoreESG = await model.CompanyScore.findAll({
			where: { companyCode },
		});

		const pillarWeights = await Promise.all(
			[1, 2, 3].map((pillarId) =>
				model.Criteria.findOne({
					where: {
						applicableIndustryCode:
							companyInfor.dataValues.industryCodeLevel2,
						pillarId,
					},
					attributes: ["pillarWeight"],
				})
			)
		);

		const [environmentWeight, socialWeight, governanceWeight] =
			pillarWeights.map((w) => w?.pillarWeight);

		const data = companyScoreESG.map((score) => ({
			year: score.dataValues.year,
			esg: score.dataValues.esgScore,
			esgRank: score.dataValues.esgRank,
			environmental: score.dataValues.environmentScore,
			environmentRank: score.dataValues.environmentRank,
			environmentWeight,
			social: score.dataValues.socialScore,
			socialRank: score.dataValues.socialRank,
			socialWeight,
			governance: score.dataValues.governanceScore,
			governanceRank: score.dataValues.governanceRank,
			governanceWeight,
		}));
		const maxYear = Math.max(...data.map((item) => item.year));
		const filteredData = data
			.filter((item) => item.year >= maxYear - 4)
			.sort((a, b) => a.year - b.year);
		return { company: { name: companyCode, data: filteredData } };
	}
}

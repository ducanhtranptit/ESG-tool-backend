import model from "../models/index.js";
export default class PillarActions {
	static async dataForChart(userId, pillarId, itemId, lang) {
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
			attributes: ["industryCodeLevel2"],
			raw: true,
		});
		const criteriaItems = await model.CriteriaItem.findAll({
			where: {
				itemId: itemId,
			},
			attributes: ["criteriaId", "IChart"],
			raw: true,
		});
		const criteriaIds = criteriaItems.map((item) => item.criteriaId);
		const criteriaWithPillarId = await model.Criteria.findAll({
			where: {
				criteriaId: criteriaIds,
				pillarId: pillarId,
				applicableIndustryCode: companyInfor.industryCodeLevel2,
			},
			attributes: ["criteriaId", "criteriaCode", "pillarId", "name"],
			raw: true,
		});
		const result = [];
		for (const criteria of criteriaWithPillarId) {
			const dataChart = await model.CompanyMetric.findAll({
				where: {
					criteriaId: criteria.criteriaId,
					companyId: companyId,
				},
				attributes: ["year", "metric"],
				raw: true,
			});

			// Sắp xếp theo năm giảm dần
			dataChart.sort((a, b) => b.year - a.year);

			// Lấy 5 năm gần nhất
			const top5DataChart = dataChart.slice(0, 5);

			// Sắp xếp lại theo năm tăng dần
			top5DataChart.sort((a, b) => a.year - b.year);

			const criteriaItem = criteriaItems.find(
				(item) => item.criteriaId === criteria.criteriaId
			);
			const IChart = criteriaItem ? criteriaItem.IChart : null;

			const criteriaLocale = await model.CriteriaLocale.findOne({
				where: {
					criteriaCode: criteria.criteriaCode,
					language: lang,
				},
				raw: true,
			});
			result.push({
				criteriaId: criteria.criteriaId,
				name: criteriaLocale.name,
				IChart: IChart,
				dataChart: top5DataChart, // Chỉ trả về 5 năm gần nhất
			});
		}
		return result;
	}
}

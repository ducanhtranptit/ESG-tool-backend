import PillarActions from "./pillar.action.js";

export default class SocialAction extends PillarActions {
	static async dataSexRatioChart(userId, lang) {
		const result = PillarActions.dataForChart(userId, 2, 6, lang);
		return result;
	}
	static async dataTrainingChart(userId, lang) {
		const result = PillarActions.dataForChart(userId, 2, 7, lang);
		return result;
	}
	static async dataSalaryChangeChart(userId, lang) {
		const result = PillarActions.dataForChart(userId, 2, 8, lang);
		return result;
	}
	static async dataRiskChart(userId, lang) {
		const result = PillarActions.dataForChart(userId, 2, 9, lang);
		return result;
	}
	static async dataExpenditureChart(userId, lang) {
		const result = PillarActions.dataForChart(userId, 2, 10, lang);
		return result;
	}
}

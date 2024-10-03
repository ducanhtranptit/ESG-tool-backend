import PillarActions from "./pillar.action.js";

export default class SocialAction extends PillarActions {
	static async dataSexRatioChart(userId) {
		const result = PillarActions.dataForChart(userId, 2, 6);
		return result;
	}
	static async dataTrainingChart(userId) {
		const result = PillarActions.dataForChart(userId, 2, 7);
		return result;
	}
	static async dataSalaryChangeChart(userId) {
		const result = PillarActions.dataForChart(userId, 2, 8);
		return result;
	}
	static async dataRiskChart(userId) {
		const result = PillarActions.dataForChart(userId, 2, 9);
		return result;
	}
	static async dataExpenditureChart(userId) {
		const result = PillarActions.dataForChart(userId, 2, 10);
		return result;
	}
}

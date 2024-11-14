import PillarActions from "./pillar.action.js";

export default class EnvironmentAction extends PillarActions {
	static async dataEmissionChart(userId, lang) {
		const result = EnvironmentAction.dataForChart(userId, 1, 1, lang);
		return result;
	}
	static async dataWaterChart(userId, lang) {
		const result = EnvironmentAction.dataForChart(userId, 1, 2, lang);
		return result;
	}
	static async dataWasteChart(userId, lang) {
		const result = EnvironmentAction.dataForChart(userId, 1, 3, lang);
		return result;
	}
	static async dataElectricityChart(userId, lang) {
		const result = EnvironmentAction.dataForChart(userId, 1, 4, lang);
		return result;
	}
	static async dataInkPapersChart(userId, lang) {
		const result = EnvironmentAction.dataForChart(userId, 1, 5, lang);
		return result;
	}
}

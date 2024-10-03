import PillarActions from "./pillar.action.js";

export default class EnvironmentAction extends PillarActions {
	static async dataEmissionChart(userId) {
		const result = EnvironmentAction.dataForChart(userId, 1, 1);
		return result;
	}
	static async dataWaterChart(userId) {
		const result = EnvironmentAction.dataForChart(userId, 1, 2);
		return result;
	}
	static async dataWasteChart(userId) {
		const result = EnvironmentAction.dataForChart(userId, 1, 3);
		return result;
	}
	static async dataElectricityChart(userId) {
		const result = EnvironmentAction.dataForChart(userId, 1, 4);
		return result;
	}
	static async dataInkPapersChart(userId) {
		const result = EnvironmentAction.dataForChart(userId, 1, 5);
		return result;
	}
}

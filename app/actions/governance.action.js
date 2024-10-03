import PillarActions from "./pillar.action.js";

export default class GovernanceAction extends PillarActions {
	static async dataSexRatioChart(userId) {
		const result = PillarActions.dataForChart(userId, 3, 11);
		return result;
	}
	static async dataSupplierRatioChart(userId) {
		const result = PillarActions.dataForChart(userId, 3, 12);
		return result;
	}
	static async dataViolateChart(userId) {
		const result = PillarActions.dataForChart(userId, 3, 13);
		return result;
	}
}

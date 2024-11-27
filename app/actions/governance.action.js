import PillarActions from "./pillar.action.js";

export default class GovernanceAction extends PillarActions {
	static async dataSexRatioChart(userId, lang) {
		const result = GovernanceAction.dataForChart(userId, 3, 11, lang);
		return result;
	}
	static async dataSupplierRatioChart(userId, lang) {
		const result = GovernanceAction.dataForChart(userId, 3, 12, lang);
		return result;
	}
	static async dataViolateChart(userId, lang) {
		const result = GovernanceAction.dataForChart(userId, 3, 13, lang);
		return result;
	}
}

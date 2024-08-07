import model from "../models/index.js";


class EsgReportAction {
	static async calculateESGReport() {
		const data = await model.CompanyMetric.findAll();
		return data;
	}
}

export default EsgReportAction;

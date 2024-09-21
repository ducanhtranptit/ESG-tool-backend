import CompanyInfoAction from "../actions/companyinfor.action.js";
import {
	SuccessResponse,
	ErrorResponse,
	BadRequestResponse,
} from "../core/ApiResponse.js";

export default class CompanyInfoController {
	static async getAllCompanyInfors(req, res) {
		try {
			const id = req?.data?.id;
			if (!id) return new BadRequestResponse().send(req, res);
			const data = await CompanyInfoAction.getAllCompanyInfors(
				parseInt(id)
			);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async updateCompanyInfor(req, res) {
		const data = req.body;
		const overallInfor = {
			companyName: data.companyName,
			dateFounder: data.dateFounder,
			mainAddress: data.mainAddress,
			mainPhoneNumber: data.mainPhoneNumber,
			companyWebsite: data.companyWebsite,
			companySector: data.companySector,
			companyDescription: data.companyDescription,
			totalRevenue: data.totalRevenue,
			netIncome: data.netIncome,
			fullTimeEmployees: data.fullTimeEmployees,
			partTimeEmployees: data.partTimeEmployees,
			contactInformation: data.contactInformation,
		};
		const siteInfors = data.siteInformation;
		const productInfors = data.productInformation;
		await CompanyInfoAction.createCompanyInfor(
			overallInfor,
			siteInfors,
			productInfors
		);
		return new SuccessResponse().send(req, res);
	}
}

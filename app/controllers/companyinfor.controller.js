import CompanyInfoAction from "../actions/companyinfor.action.js";
import {
	SuccessResponse,
	ErrorResponse,
	BadRequestResponse,
} from "../core/ApiResponse.js";

export default class CompanyInfoController {
	static async getAllOverallInfors(req, res) {
		try {
			const data = await CompanyInfoAction.findAll();
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}
	static async getAllCompanyInfors(req, res) {
		try {
			const userId = req?.data?.id;
			if (!userId) return new BadRequestResponse().send(req, res);
			const data = await CompanyInfoAction.getAllCompanyInfors(
				parseInt(userId)
			);
			return new SuccessResponse().send(req, res, data);
		} catch (error) {
			console.error(error);
			return new ErrorResponse().send(req, res);
		}
	}

	static async updateCompanyInfor(req, res) {
		const { id: userId } = req.data;
		if (!userId) return new BadRequestResponse().send(req, res);
		const data = req.body;
		const overallInfor = {
			companyName: data.companyName,
			dateFounder: data.dateFounder,
			mainAddress: data.mainAddress,
			mainPhoneNumber: data.mainPhoneNumber,
			companyWebsite: data.companyWebsite,
			companySector: data.companySector,
			companyDescription: data.companyDescription,
			contactInformation: data.contactInformation,
		};
		const siteInfors = data.siteInformation;
		const productInfors = data.productInformation;
		await CompanyInfoAction.updateCompanyInfor(
			overallInfor,
			siteInfors,
			productInfors,
			userId
		);
		return new SuccessResponse().send(req, res);
	}
}

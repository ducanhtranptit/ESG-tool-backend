import model from "../models/index.js";
export default class UserService {
	static async getCompanyInfor(userId) {
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
			raw: true,
		});
		return companyInfor;
	}
}

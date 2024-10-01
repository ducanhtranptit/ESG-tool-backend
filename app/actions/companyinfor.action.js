import model from "../models/index.js";

export default class CompanyInfoAction {
	static async findAll() {
		const result = await model.OverallInfor.findAll({
			attributes: ["id", "companyName"],
		});
		return result;
	}

	static async getAllCompanyInfors(companyId) {
		const overallInfor = await model.OverallInfor.findAll({
			where: { id: companyId },
		});
		if (overallInfor.length === 0) {
			return null;
		}
		const siteInfors = await model.SiteInfor.findAll({
			where: { companyId: companyId },
		});
		const productInfors = await model.ProductInfor.findAll({
			where: { companyId: companyId },
		});

		const result = {
			overallInfor,
			siteInfors,
			productInfors,
		};
		return result;
	}

	static async updateCompanyInfor(overallInfor, siteInfors, productInfors, userId) {
		// Cập nhật thông tin tổng quan về công ty
		const updatedCompany = await model.OverallInfor.update(
			{
				companyName: overallInfor.companyName,
				dateFounder: parseInt(overallInfor.dateFounder),
				mainAddress: overallInfor.mainAddress,
				mainPhoneNumber: overallInfor.mainPhoneNumber,
				companyWebsite: overallInfor.companyWebsite,
				companySector: overallInfor.companySector,
				companyDescription: overallInfor.companyDescription,
				totalRevenue: parseInt(overallInfor.totalRevenue),
				netIncome: parseInt(overallInfor.netIncome),
				fullTimeEmployee: parseInt(overallInfor.fullTimeEmployees),
				partTimeEmployee: parseInt(overallInfor.partTimeEmployees),
				contactInformation: overallInfor.contactInformation,
			},
			{
				where: { id: overallInfor.id }, // Cập nhật dựa trên `id` của công ty
			}
		);

		// Xử lý cập nhật thông tin SiteInfor
		if (siteInfors && siteInfors.length > 0) {
			// Duyệt qua từng site và cập nhật hoặc tạo mới nếu chưa có
			for (let site of siteInfors) {
				if (site.id) {
					// Nếu site đã có ID, cập nhật site đó
					await model.SiteInfor.update(
						{
							siteName: site.siteName,
							numberEmployees: parseInt(site.numberOfEmployees),
							comment: site.comment,
						},
						{
							where: { id: site.id }, // Cập nhật site theo `id`
						}
					);
				} else {
					// Nếu không có ID (tức là site mới), thêm mới site
					await model.SiteInfor.create({
						companyId: overallInfor.id,
						siteName: site.siteName,
						numberEmployees: parseInt(site.numberOfEmployees),
						comment: site.comment,
					});
				}
			}
		}

		// Xử lý cập nhật thông tin ProductInfor
		if (productInfors && productInfors.length > 0) {
			// Duyệt qua từng sản phẩm và cập nhật hoặc tạo mới nếu chưa có
			for (let product of productInfors) {
				if (product.id) {
					// Nếu sản phẩm đã có ID, cập nhật sản phẩm đó
					await model.ProductInfor.update(
						{
							productName: product.productName,
							revenue: parseInt(product.revenue),
							comment: product.comment,
						},
						{
							where: { id: product.id }, // Cập nhật sản phẩm theo `id`
						}
					);
				} else {
					// Nếu không có ID (tức là sản phẩm mới), thêm mới sản phẩm
					await model.ProductInfor.create({
						companyId: overallInfor.id,
						productName: product.productName,
						revenue: parseInt(product.revenue),
						comment: product.comment,
					});
				}
			}
		}

		return updatedCompany;
	}
}

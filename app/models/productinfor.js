import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class ProductInfor extends Model {
		static associate(models) {
			ProductInfor.belongsTo(models.OverallInfor, { foreignKey: "companyId" });
			ProductInfor.belongsTo(models.ProductType, { foreignKey: "productType" });
		}
	}
	ProductInfor.init(
		{
			companyId: DataTypes.NUMBER,
			productType: DataTypes.INTEGER,
			productName: DataTypes.STRING,
			revenue: DataTypes.NUMBER,
			comment: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ProductInfor",
		}
	);
	return ProductInfor;
};

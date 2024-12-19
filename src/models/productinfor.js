import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class ProductInfor extends Model {
		static associate(models) {
		}
	}
	ProductInfor.init(
		{
			overallInforId: DataTypes.NUMBER,
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

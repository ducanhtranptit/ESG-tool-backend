import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class ProductType extends Model {
		static associate(models) {
			ProductType.hasMany(models.ProductType, { foreignKey: "productType" });
		}
	}
	ProductType.init(
		{
			productType: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ProductType",
		}
	);
	return ProductType;
};
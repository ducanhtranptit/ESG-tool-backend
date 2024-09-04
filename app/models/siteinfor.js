import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class SiteInfor extends Model {
		static associate(models) {
			SiteInfor.belongsTo(models.OverallInfor, { foreignKey: "companyId" });
		}
	}
	SiteInfor.init(
		{
			companyId: DataTypes.INTEGER,
			siteName: DataTypes.STRING,
			numberEmployees: DataTypes.NUMBER,
			comment: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "SiteInfor",
		}
	);
	return SiteInfor;
};

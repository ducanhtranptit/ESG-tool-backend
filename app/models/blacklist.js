import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class BlackList extends Model {
		static associate(models) {}
	}
	BlackList.init(
		{
			token: DataTypes.STRING,
			expiresIn: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "BlackList",
		}
	);
	return BlackList;
};
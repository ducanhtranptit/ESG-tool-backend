import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Dummy extends Model {}
	Dummy.init(
		{
			questionCode: DataTypes.STRING,
			answer: DataTypes.STRING,
			dummy: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "Dummy",
		}
	);
	return Dummy;
};

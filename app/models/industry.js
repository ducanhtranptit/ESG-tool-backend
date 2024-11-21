import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class Industry extends Model {
		static associate(models) {}
	}

	Industry.init(
		{
			level2: DataTypes.INTEGER,
			level3: DataTypes.INTEGER,
			industryName: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Industry",
		}
	);

	return Industry;
};

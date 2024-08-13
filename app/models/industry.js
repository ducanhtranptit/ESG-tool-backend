import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class Industry extends Model {
		static associate(models) {}
	}

	Industry.init(
		{
			firstName: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Industry",
		}
	);

	return Industry;
};

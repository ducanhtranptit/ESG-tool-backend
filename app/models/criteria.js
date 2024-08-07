import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class Criteria extends Model {
		static associate(models) {}
	}

	Criteria.init(
		{
			firstName: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Criteria",
		}
	);

	return Criteria;
};

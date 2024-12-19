import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class Criteria extends Model {
		static associate(models) {}
	}

	Criteria.init(
		{
			criteriaId: DataTypes.INTEGER,
			criteriaCode: DataTypes.INTEGER,
			name: DataTypes.TEXT,
			dataType: DataTypes.STRING,
			description: DataTypes.STRING,
			pillarId: DataTypes.INTEGER,
			categoryId: DataTypes.INTEGER,
			measurementMethod: DataTypes.STRING,
			applicableIndustryCode: DataTypes.INTEGER,
			transformationMethod: DataTypes.STRING,
			weight: DataTypes.FLOAT,
			unit: DataTypes.STRING,
			polarityIndicating: DataTypes.STRING,
			pillarWeight: DataTypes.FLOAT,
			newCriteriaWeight: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "Criteria",
		}
	);

	return Criteria;
};

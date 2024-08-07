import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
	class Company extends Model {
		static associate(models) {}
	}

	Company.init(
		{
			companyCode: DataTypes.STRING,
			companyName: DataTypes.STRING,
			industryId: DataTypes.INTEGER,
			industryCodeLevel3: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "CompanyMetric",
		}
	);

	return Company;
};

import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class OverallInfor extends Model {
		static associate(models) {}
	}
	OverallInfor.init(
		{
			companyName: DataTypes.STRING,
			userId: {
				type: DataTypes.INTEGER,
				unique: true,
			},
			dateFounder: DataTypes.INTEGER,
			mainAddress: DataTypes.STRING,
			mainPhoneNumber: DataTypes.STRING,
			companyWebsite: DataTypes.STRING,
			companySector: DataTypes.STRING,
			companyDescription: DataTypes.TEXT,
			contactInformation: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "OverallInfor",
		}
	);
	return OverallInfor;
};

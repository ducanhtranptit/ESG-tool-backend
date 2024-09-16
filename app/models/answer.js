import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Answer extends Model {}
	Answer.init(
		{
			questionCode: DataTypes.STRING,
			companyCode: DataTypes.STRING,
			year: DataTypes.INTEGER,
			answer: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "Answer",
		}
	);
	return Answer;
};

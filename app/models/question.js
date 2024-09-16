import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Question extends Model {}
	Question.init(
		{
			questionCode: DataTypes.STRING,
			topicCode: DataTypes.STRING,
			name: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Question",
		}
	);
	return Question;
};

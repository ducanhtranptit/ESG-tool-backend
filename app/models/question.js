import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Question extends Model {}
	Question.init(
		{
			questionCode: DataTypes.STRING,
			topicCode: DataTypes.STRING,
			name: DataTypes.TEXT,
			answer1: DataTypes.STRING,
			answer2: DataTypes.STRING,
			answer3: DataTypes.STRING,
			answer4: DataTypes.STRING,
			answer5: DataTypes.STRING,
			answer6: DataTypes.STRING,
			answer7: DataTypes.STRING,
			answer8: DataTypes.STRING,
			answer9: DataTypes.STRING,
			answer10: DataTypes.STRING,
			type: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Question",
		}
	);
	return Question;
};

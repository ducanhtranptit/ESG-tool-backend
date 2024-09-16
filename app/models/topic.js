import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
	class Topic extends Model {}
	Topic.init(
		{
			topicCode: DataTypes.STRING,
			name: DataTypes.TEXT,
			answerGuide: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Topic",
		}
	);
	return Topic;
};
